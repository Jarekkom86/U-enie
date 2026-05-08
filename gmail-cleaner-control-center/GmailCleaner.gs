/**
 * Core Gmail Cleaner Control Center processing logic.
 *
 * Safety model:
 * - Dry-run is the default and does not change Gmail.
 * - Live mode requires the exact confirmation text from Config.gs.
 * - Live mode adds labels only, except optional archive handling for rules that
 *   explicitly allow it.
 * - No trash or mailbox removal operations are implemented in this file.
 */

/**
 * Runs one configured Gmail cleaner rule.
 *
 * @param {string} ruleId Rule identifier from getDefaultConfig().rules.
 * @param {Object=} options Runtime options.
 * @return {Object} Run result summary.
 */
function runRule(ruleId, options) {
  var config = getDefaultConfig();
  var rule = config.rules[ruleId];
  var startedAt = nowIsoForCleaner_();
  var runId = buildRunId();
  var lock = null;
  var lockAcquired = false;
  var normalizedOptions = null;
  var result;

  if (!rule) {
    result = {
      success: false,
      runId: runId,
      ruleId: ruleId || '',
      dryRun: true,
      query: '',
      label: '',
      searched: 0,
      processed: 0,
      labeled: 0,
      skippedAlreadyLabeled: 0,
      archived: 0,
      errors: 1,
      startedAt: startedAt,
      finishedAt: nowIsoForCleaner_(),
      message: 'Rule not found: ' + (ruleId || '')
    };
    saveState({
      lastRunId: runId,
      lastRuleId: ruleId || '',
      processed: 0,
      labeled: 0,
      skipped: 0,
      archived: 0,
      errors: 1
    });
    logRunSummary(result);
    return result;
  }

  rule.ruleId = ruleId;

  try {
    if (isForbiddenCommand_(options || {})) {
      throw new Error('Forbidden option content detected.');
    }

    normalizedOptions = normalizeOptions(rule, options || {});
    validateLiveOptions(rule, normalizedOptions);

    lock = LockService.getScriptLock();
    lockAcquired = lock.tryLock(5000);

    if (!lockAcquired) {
      result = {
        success: false,
        runId: runId,
        ruleId: ruleId,
        dryRun: normalizedOptions.dryRun,
        query: rule.query,
        label: rule.label,
        searched: 0,
        processed: 0,
        labeled: 0,
        skippedAlreadyLabeled: 0,
        archived: 0,
        errors: 1,
        startedAt: startedAt,
        finishedAt: nowIsoForCleaner_(),
        message: 'Could not acquire Gmail Cleaner lock. Another run may be active.'
      };
      saveState({
        lastRunId: runId,
        lastRuleId: ruleId,
        processed: 0,
        labeled: 0,
        skipped: 0,
        archived: 0,
        errors: 1
      });
      logRunSummary(result);
      return result;
    }

    normalizedOptions.runId = runId;
    normalizedOptions.ruleId = ruleId;

    var partial = processThreads(rule, normalizedOptions);
    result = {
      success: partial.errors === 0,
      runId: runId,
      ruleId: ruleId,
      dryRun: normalizedOptions.dryRun,
      query: rule.query,
      label: rule.label,
      searched: partial.searched,
      processed: partial.processed,
      labeled: partial.labeled,
      skippedAlreadyLabeled: partial.skippedAlreadyLabeled,
      archived: partial.archived,
      errors: partial.errors,
      startedAt: startedAt,
      finishedAt: nowIsoForCleaner_(),
      message: partial.errors === 0
        ? 'Rule completed.'
        : 'Rule completed with per-thread errors.'
    };

    saveState({
      lastRunId: runId,
      lastRuleId: ruleId,
      processed: result.processed,
      labeled: result.labeled,
      skipped: result.skippedAlreadyLabeled,
      archived: result.archived,
      errors: result.errors
    });
    logRunSummary(result);
    return result;
  } catch (error) {
    result = {
      success: false,
      runId: runId,
      ruleId: ruleId,
      dryRun: normalizedOptions ? normalizedOptions.dryRun : true,
      query: rule.query,
      label: rule.label,
      searched: 0,
      processed: 0,
      labeled: 0,
      skippedAlreadyLabeled: 0,
      archived: 0,
      errors: 1,
      startedAt: startedAt,
      finishedAt: nowIsoForCleaner_(),
      message: String(error)
    };
    Logger.log('runRule failed: ' + error);
    saveState({
      lastRunId: runId,
      lastRuleId: ruleId,
      processed: 0,
      labeled: 0,
      skipped: 0,
      archived: 0,
      errors: 1
    });
    logRunSummary(result);
    return result;
  } finally {
    if (lock && lockAcquired) {
      lock.releaseLock();
    }
  }
}

/**
 * Searches and processes one batch of threads for a rule.
 *
 * @param {Object} rule Rule object.
 * @param {Object} options Normalized runtime options.
 * @return {Object} Partial processing counters.
 */
function processThreads(rule, options) {
  var threads = retryOperation(function() {
    return GmailApp.search(rule.query, 0, options.batchSize);
  }, 'GmailApp.search for rule ' + rule.ruleId);

  var summary = {
    searched: threads.length,
    processed: 0,
    labeled: 0,
    skippedAlreadyLabeled: 0,
    archived: 0,
    errors: 0
  };
  var label = null;

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var threadId = '';
    var subject = '';
    var from = '';

    try {
      summary.processed++;
      threadId = thread.getId ? thread.getId() : '';
      subject = getThreadSubject_(thread);
      from = getThreadFrom_(thread);

      if (threadHasLabel(thread, rule.label)) {
        summary.skippedAlreadyLabeled++;
        appendLogRow({
          timestamp: nowIsoForCleaner_(),
          runId: options.runId,
          ruleId: rule.ruleId,
          dryRun: options.dryRun,
          query: rule.query,
          label: rule.label,
          threadId: threadId,
          subject: subject,
          from: from,
          action: 'skipped_already_labeled',
          status: 'skipped',
          error: ''
        });
        continue;
      }

      if (options.dryRun) {
        appendLogRow({
          timestamp: nowIsoForCleaner_(),
          runId: options.runId,
          ruleId: rule.ruleId,
          dryRun: true,
          query: rule.query,
          label: rule.label,
          threadId: threadId,
          subject: subject,
          from: from,
          action: 'dry_run_match',
          status: 'success',
          error: ''
        });
        continue;
      }

      if (!label) {
        label = ensureLabel(rule.label);
      }

      safeAddLabel(label, thread);
      summary.labeled++;
      appendLogRow({
        timestamp: nowIsoForCleaner_(),
        runId: options.runId,
        ruleId: rule.ruleId,
        dryRun: false,
        query: rule.query,
        label: rule.label,
        threadId: threadId,
        subject: subject,
        from: from,
        action: 'label_added',
        status: 'success',
        error: ''
      });

      if (options.archive === true && rule.allowArchive === true) {
        if (safeArchiveThread(thread, rule, options)) {
          summary.archived++;
          appendLogRow({
            timestamp: nowIsoForCleaner_(),
            runId: options.runId,
            ruleId: rule.ruleId,
            dryRun: false,
            query: rule.query,
            label: rule.label,
            threadId: threadId,
            subject: subject,
            from: from,
            action: 'archived',
            status: 'success',
            error: ''
          });
        }
      }
    } catch (error) {
      summary.errors++;
      Logger.log('Thread processing failed: ' + error);
      appendLogRow({
        timestamp: nowIsoForCleaner_(),
        runId: options.runId,
        ruleId: rule.ruleId,
        dryRun: options.dryRun,
        query: rule.query,
        label: rule.label,
        threadId: threadId,
        subject: subject,
        from: from,
        action: 'thread_error',
        status: 'error',
        error: String(error)
      });
    }
  }

  return summary;
}

/**
 * Runs a JSON command prepared outside the script.
 *
 * @param {string} jsonText Command JSON text.
 * @return {Object} Command result.
 */
function runCommandJson(jsonText) {
  var command;

  try {
    command = JSON.parse(jsonText || '{}');
  } catch (error) {
    return {
      success: false,
      message: 'Invalid JSON command: ' + error
    };
  }

  if (isForbiddenCommand_(command)) {
    return {
      success: false,
      message: 'Forbidden command content detected.'
    };
  }

  if (command.action !== 'runRule') {
    return {
      success: false,
      message: 'Unsupported action. Only runRule is allowed.'
    };
  }

  return runRule(command.ruleId, command);
}

/**
 * Gets or creates a Gmail user label using retry/backoff.
 *
 * @param {string} labelName Label name.
 * @return {GoogleAppsScript.Gmail.GmailLabel} Gmail label.
 */
function ensureLabel(labelName) {
  return retryOperation(function() {
    var label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      label = GmailApp.createLabel(labelName);
    }
    return label;
  }, 'ensureLabel ' + labelName);
}

/**
 * Checks whether a thread already has a specific label.
 *
 * @param {GoogleAppsScript.Gmail.GmailThread} thread Gmail thread.
 * @param {string} labelName Label name.
 * @return {boolean} True when the label is already present.
 */
function threadHasLabel(thread, labelName) {
  var labels = retryOperation(function() {
    return thread.getLabels();
  }, 'threadHasLabel ' + labelName);

  for (var i = 0; i < labels.length; i++) {
    if (labels[i].getName && labels[i].getName() === labelName) {
      return true;
    }
  }

  return false;
}

/**
 * Adds a Gmail label to a thread using retry/backoff.
 *
 * @param {GoogleAppsScript.Gmail.GmailLabel} label Gmail label.
 * @param {GoogleAppsScript.Gmail.GmailThread} thread Gmail thread.
 * @return {boolean} True when the operation completes.
 */
function safeAddLabel(label, thread) {
  retryOperation(function() {
    label.addToThread(thread);
    return true;
  }, 'safeAddLabel');
  return true;
}

/**
 * Archives a thread only when all archive safety gates are satisfied.
 *
 * @param {GoogleAppsScript.Gmail.GmailThread} thread Gmail thread.
 * @param {Object} rule Rule object.
 * @param {Object} options Normalized runtime options.
 * @return {boolean} True when archived, false when not allowed.
 */
function safeArchiveThread(thread, rule, options) {
  if (options.archive !== true || options.dryRun !== false || rule.allowArchive !== true) {
    return false;
  }

  retryOperation(function() {
    thread.moveToArchive();
    return true;
  }, 'safeArchiveThread');
  return true;
}

/**
 * Validates live-mode and forbidden command options.
 *
 * @param {Object} rule Rule object.
 * @param {Object} options Normalized runtime options.
 */
function validateLiveOptions(rule, options) {
  var config = getDefaultConfig();

  if (isForbiddenCommand_(options)) {
    throw new Error('Forbidden option content detected.');
  }

  if (options.dryRun === true) {
    return;
  }

  if (options.confirmText !== config.liveConfirmationText) {
    throw new Error('Live mode requires exact confirmation text.');
  }

  if (options.archive === true && rule.allowArchive !== true) {
    throw new Error('Archive is not allowed for this rule.');
  }
}

/**
 * Applies safe defaults and bounds to runtime options.
 *
 * @param {Object} rule Rule object.
 * @param {Object=} options Runtime options.
 * @return {Object} Normalized options.
 */
function normalizeOptions(rule, options) {
  var config = getDefaultConfig();
  var input = options || {};
  var explicitLive = input.dryRun === false;
  var batchSize = parseInt(input.batchSize, 10);

  if (isNaN(batchSize)) {
    batchSize = config.batchSizeDefault;
  }

  batchSize = Math.max(1, Math.min(50, batchSize));

  return {
    dryRun: rule.dryRun === true && !explicitLive ? true : input.dryRun !== false,
    batchSize: batchSize,
    archive: input.archive === true,
    markRead: input.markRead === true,
    confirmText: input.confirmText || ''
  };
}

/**
 * Builds a run identifier for logs and state.
 *
 * @return {string} Run identifier.
 */
function buildRunId() {
  var timestamp = Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd_HHmmss');
  var random = Utilities.getUuid().split('-')[0];
  return 'GCLEAN_' + timestamp + '_' + random;
}

/**
 * Retries an operation with conservative backoff.
 *
 * @param {Function} fn Operation to execute.
 * @param {string} context Logging context.
 * @return {*} Operation return value.
 */
function retryOperation(fn, context) {
  var waits = [500, 1500, 3000];
  var lastError;

  for (var attempt = 0; attempt < waits.length; attempt++) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
      Logger.log(
        'Retryable operation failed in ' + context +
        ' attempt ' + (attempt + 1) + ': ' + error
      );
      if (attempt < waits.length - 1) {
        Utilities.sleep(waits[attempt]);
      }
    }
  }

  throw lastError;
}

/**
 * Safely reads a thread subject.
 *
 * @param {GoogleAppsScript.Gmail.GmailThread} thread Gmail thread.
 * @return {string} Thread subject or empty string.
 */
function getThreadSubject_(thread) {
  try {
    return thread.getFirstMessageSubject ? thread.getFirstMessageSubject() : '';
  } catch (error) {
    Logger.log('getThreadSubject_ failed: ' + error);
    return '';
  }
}

/**
 * Safely reads the sender of the first message in a thread.
 *
 * @param {GoogleAppsScript.Gmail.GmailThread} thread Gmail thread.
 * @return {string} First message sender or empty string.
 */
function getThreadFrom_(thread) {
  try {
    var messages = thread.getMessages ? thread.getMessages() : [];
    if (messages.length === 0) {
      return '';
    }
    return messages[0].getFrom ? messages[0].getFrom() : '';
  } catch (error) {
    Logger.log('getThreadFrom_ failed: ' + error);
    return '';
  }
}

/**
 * Returns a UTC ISO-like timestamp for cleaner logs.
 *
 * @return {string} Timestamp.
 */
function nowIsoForCleaner_() {
  return Utilities.formatDate(
    new Date(),
    'UTC',
    "yyyy-MM-dd'T'HH:mm:ss'Z'"
  );
}

/**
 * Detects forbidden command content recursively in keys and action values.
 *
 * @param {*} value Value to inspect.
 * @return {boolean} True when forbidden command content is found.
 */
function isForbiddenCommand_(value) {
  var forbidden = /(^|[^a-z])(delete|trash|remove)([^a-z]|$)/i;

  if (value === null || typeof value === 'undefined') {
    return false;
  }

  if (Object.prototype.toString.call(value) === '[object Array]') {
    for (var i = 0; i < value.length; i++) {
      if (isForbiddenCommand_(value[i])) {
        return true;
      }
    }
    return false;
  }

  if (typeof value === 'object') {
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (forbidden.test(key)) {
          return true;
        }
        if (key === 'action' && typeof value[key] === 'string' && forbidden.test(value[key])) {
          return true;
        }
        if (typeof value[key] === 'object' && isForbiddenCommand_(value[key])) {
          return true;
        }
      }
    }
  }

  return false;
}
