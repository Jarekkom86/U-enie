/**
 * Logging and state helpers for Gmail Cleaner Control Center.
 *
 * This file intentionally uses only SpreadsheetApp, PropertiesService,
 * Utilities, and Logger. It does not contain any Gmail operations.
 */

var GMAIL_CLEANER_LOG_SHEET_ID_KEY = 'GMAIL_CLEANER_LOG_SHEET_ID';
var GMAIL_CLEANER_LAST_LOG_ERROR_KEY = 'GMAIL_CLEANER_LAST_LOG_ERROR';
var GMAIL_CLEANER_LAST_RUN_SUMMARY_KEY = 'GMAIL_CLEANER_LAST_RUN_SUMMARY';
var GMAIL_CLEANER_STATE_KEY = 'GMAIL_CLEANER_STATE';
var GMAIL_CLEANER_LOG_SPREADSHEET_NAME = 'Gmail Cleaner Logs';
var GMAIL_CLEANER_LOG_SHEET_NAME = 'Logs';
var GMAIL_CLEANER_LOG_HEADERS = [
  'timestamp',
  'runId',
  'ruleId',
  'dryRun',
  'query',
  'label',
  'threadId',
  'subject',
  'from',
  'action',
  'status',
  'error'
];

/**
 * Creates or opens the logging spreadsheet and ensures the Logs sheet exists.
 *
 * @return {GoogleAppsScript.Spreadsheet.Sheet} Logs sheet.
 */
function createOrOpenLogSheet() {
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty(GMAIL_CLEANER_LOG_SHEET_ID_KEY);
  var spreadsheet;

  if (spreadsheetId) {
    try {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    } catch (error) {
      Logger.log('Failed to open existing Gmail Cleaner log spreadsheet: ' + error);
      props.setProperty(GMAIL_CLEANER_LAST_LOG_ERROR_KEY, String(error));
      spreadsheet = null;
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create(GMAIL_CLEANER_LOG_SPREADSHEET_NAME);
    props.setProperty(GMAIL_CLEANER_LOG_SHEET_ID_KEY, spreadsheet.getId());
  }

  var sheet = spreadsheet.getSheetByName(GMAIL_CLEANER_LOG_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(GMAIL_CLEANER_LOG_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(GMAIL_CLEANER_LOG_HEADERS);
  }

  return sheet;
}

/**
 * Appends one structured row to the Logs sheet.
 *
 * @param {Object} row Log row values keyed by header name.
 * @return {boolean} True on success, false when logging failed.
 */
function appendLogRow(row) {
  try {
    var safeRow = row || {};
    var sheet = createOrOpenLogSheet();
    var values = GMAIL_CLEANER_LOG_HEADERS.map(function(header) {
      if (Object.prototype.hasOwnProperty.call(safeRow, header)) {
        return safeRow[header] === null || typeof safeRow[header] === 'undefined'
          ? ''
          : safeRow[header];
      }
      return '';
    });

    sheet.appendRow(values);
    return true;
  } catch (error) {
    var message = 'appendLogRow failed: ' + error;
    Logger.log(message);
    PropertiesService.getScriptProperties().setProperty(
      GMAIL_CLEANER_LAST_LOG_ERROR_KEY,
      message
    );
    return false;
  }
}

/**
 * Saves and logs a run summary row.
 *
 * @param {Object} result Run summary object.
 * @return {boolean} True when spreadsheet row was written, false otherwise.
 */
function logRunSummary(result) {
  var safeResult = result || {};
  saveLastRunSummary(safeResult);

  return appendLogRow({
    timestamp: nowIso_(),
    runId: safeResult.runId || '',
    ruleId: safeResult.ruleId || '',
    dryRun: typeof safeResult.dryRun === 'undefined' ? '' : safeResult.dryRun,
    query: safeResult.query || '',
    label: safeResult.label || '',
    threadId: '',
    subject: safeResult.message || '',
    from: '',
    action: 'run_summary',
    status: safeResult.success ? 'success' : 'error',
    error: safeResult.error || safeResult.errors || ''
  });
}

/**
 * Persists the most recent run summary in Script Properties.
 *
 * @param {Object} result Run summary object.
 * @return {Object} Saved summary object.
 */
function saveLastRunSummary(result) {
  var summary = result || {};
  summary.savedAt = nowIso_();

  PropertiesService.getScriptProperties().setProperty(
    GMAIL_CLEANER_LAST_RUN_SUMMARY_KEY,
    JSON.stringify(summary)
  );

  return summary;
}

/**
 * Returns the most recent saved run summary.
 *
 * @return {Object} Run summary object or a safe fallback.
 */
function getLastRunSummary() {
  var text = PropertiesService.getScriptProperties().getProperty(
    GMAIL_CLEANER_LAST_RUN_SUMMARY_KEY
  );

  return safeJsonParse_(text, {
    success: false,
    message: 'No previous run summary found.'
  });
}

/**
 * Returns the persisted cleaner state or a safe default state.
 *
 * @return {Object} Cleaner state object.
 */
function getState() {
  var text = PropertiesService.getScriptProperties().getProperty(GMAIL_CLEANER_STATE_KEY);

  return safeJsonParse_(text, {
    lastRunId: '',
    lastRuleId: '',
    processed: 0,
    labeled: 0,
    skipped: 0,
    archived: 0,
    errors: 0,
    updatedAt: ''
  });
}

/**
 * Persists cleaner state in Script Properties.
 *
 * @param {Object} state Cleaner state object.
 * @return {Object} Saved state object.
 */
function saveState(state) {
  var nextState = state || {};
  nextState.updatedAt = nowIso_();

  PropertiesService.getScriptProperties().setProperty(
    GMAIL_CLEANER_STATE_KEY,
    JSON.stringify(nextState)
  );

  return nextState;
}

/**
 * Resets transient cleaner state without removing the log spreadsheet or its ID.
 *
 * @return {Object} Reset result.
 */
function resetCleanerState() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty(GMAIL_CLEANER_STATE_KEY);
  props.deleteProperty(GMAIL_CLEANER_LAST_RUN_SUMMARY_KEY);
  props.deleteProperty(GMAIL_CLEANER_LAST_LOG_ERROR_KEY);

  return {
    success: true,
    message: 'Gmail Cleaner state reset complete. Log spreadsheet was not removed.',
    resetAt: nowIso_()
  };
}

/**
 * Safely parses JSON text and returns fallback on missing or invalid input.
 *
 * @param {string} text JSON text.
 * @param {*} fallback Fallback value.
 * @return {*} Parsed JSON or fallback.
 */
function safeJsonParse_(text, fallback) {
  if (!text) {
    return fallback;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    Logger.log('safeJsonParse_ failed: ' + error);
    return fallback;
  }
}

/**
 * Returns an ISO-8601 timestamp for consistent logs and state records.
 *
 * @return {string} ISO timestamp.
 */
function nowIso_() {
  return Utilities.formatDate(
    new Date(),
    'UTC',
    "yyyy-MM-dd'T'HH:mm:ss'Z'"
  );
}
