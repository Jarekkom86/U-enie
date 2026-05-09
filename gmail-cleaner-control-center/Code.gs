/**
 * Entry points and UI orchestration for Gmail Cleaner Control Center.
 *
 * This file intentionally does not call GmailApp directly. Gmail access is
 * routed through the safe core functions in GmailCleaner.gs.
 */

/**
 * Adds a custom menu when the script is opened in a container-bound UI.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('Gmail Cleaner')
      .addItem('Open Dashboard', 'openDashboard')
      .addItem('Dry Run Faktúry', 'runDryRunFaktury')
      .addItem('Show Last Log', 'showLastLog')
      .addItem('Reset State', 'resetState')
      .addToUi();
  } catch (error) {
    Logger.log('onOpen menu not available in this context: ' + error);
  }
}

/**
 * Web app entry point.
 *
 * @return {GoogleAppsScript.HTML.HtmlOutput} Dashboard HTML output.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Dashboard')
    .evaluate()
    .setTitle('Gmail Cleaner Control Center')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Opens the dashboard as a sidebar when a container UI is available.
 *
 * @return {Object} Result object for non-UI contexts.
 */
function openDashboard() {
  try {
    var html = HtmlService.createTemplateFromFile('Dashboard')
      .evaluate()
      .setTitle('Gmail Cleaner Control Center');

    SpreadsheetApp.getUi().showSidebar(html);
    return {
      success: true,
      message: 'Dashboard opened in sidebar.'
    };
  } catch (error) {
    Logger.log('openDashboard fallback: ' + error);
    return {
      success: false,
      message: 'Spreadsheet UI is not available. Deploy this project as a Web App and open doGet().',
      error: String(error)
    };
  }
}

/**
 * Includes another HTML file in a template.
 *
 * @param {string} filename File name without extension.
 * @return {string} HTML content.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Runs the invoices/admin rule in read-only dry-run mode.
 *
 * @return {Object} Run result.
 */
function runDryRunFaktury() {
  return runRule('faktury_admin', {
    dryRun: true,
    batchSize: 25,
    archive: false
  });
}

/**
 * Runs the invoices/admin rule in live label-only mode.
 *
 * @param {string} confirmText Required live confirmation text.
 * @return {Object} Run result.
 */
function runLiveFakturyLabelOnly(confirmText) {
  return runRule('faktury_admin', {
    dryRun: false,
    batchSize: 25,
    archive: false,
    confirmText: confirmText || ''
  });
}

/**
 * Runs a command submitted by the dashboard form.
 *
 * @param {Object} command Dashboard command object.
 * @return {Object} Run result.
 */
function runDashboardCommand(command) {
  var safeCommand = command || {};
  var ruleId = safeCommand.ruleId || 'faktury_admin';
  var options = {
    dryRun: safeCommand.dryRun !== false,
    batchSize: safeNumber_(safeCommand.batchSize, 25),
    archive: safeCommand.archive === true,
    markRead: false,
    confirmText: safeCommand.confirmText || ''
  };

  return runRule(ruleId, options);
}

/**
 * Runs a JSON command submitted from the dashboard.
 *
 * @param {string} jsonText JSON command text.
 * @return {Object} Command result.
 */
function runDashboardJsonCommand(jsonText) {
  return runCommandJson(jsonText || '');
}

/**
 * Returns the most recent saved run summary.
 *
 * @return {Object} Last run summary.
 */
function showLastLog() {
  return getLastRunSummary();
}

/**
 * Resets transient cleaner state.
 *
 * @return {Object} Reset result.
 */
function resetState() {
  return resetCleanerState();
}

/**
 * Verifies that default configuration is present and shaped correctly.
 *
 * @return {Object} Test result.
 */
function testConfig() {
  try {
    var config = getDefaultConfig();
    var labelsCount = config.labels ? config.labels.length : 0;
    var rulesCount = config.rules ? Object.keys(config.rules).length : 0;

    return {
      success: labelsCount > 0 && rulesCount > 0,
      labelsCount: labelsCount,
      rulesCount: rulesCount,
      dryRunDefault: config.dryRunDefault === true,
      message: 'Configuration loaded.'
    };
  } catch (error) {
    return {
      success: false,
      labelsCount: 0,
      rulesCount: 0,
      dryRunDefault: false,
      message: String(error)
    };
  }
}

/**
 * Dry-run only label creation test. No labels are created here.
 *
 * @return {Object} Dry-run label list.
 */
function testLabelCreation() {
  var config = getDefaultConfig();
  return {
    success: true,
    dryRun: true,
    labels: config.labels,
    labelsCount: config.labels.length,
    message: 'Dry-run only. No labels were created.'
  };
}

/**
 * Runs a safe search-only dry run for a rule.
 *
 * @param {string=} ruleId Optional rule ID.
 * @return {Object} Dry-run result.
 */
function testSearchOnly(ruleId) {
  return runRule(ruleId || 'faktury_admin', {
    dryRun: true,
    batchSize: 5,
    archive: false
  });
}

/**
 * Runs the invoices/admin dry-run test.
 *
 * @return {Object} Dry-run result.
 */
function testDryRunFaktury() {
  return runDryRunFaktury();
}

/**
 * Tests JSON command execution in dry-run mode.
 *
 * @return {Object} Command result.
 */
function testCommandJson() {
  var command = {
    action: 'runRule',
    ruleId: 'faktury_admin',
    dryRun: true,
    batchSize: 5,
    archive: false
  };

  return runCommandJson(JSON.stringify(command));
}

/**
 * Returns bootstrap data for the dashboard.
 *
 * @return {Object} Bootstrap data.
 */
function getDashboardBootstrap() {
  var config = getDefaultConfig();
  var state = typeof getState === 'function' ? getState() : {};
  var lastRun = getLastRunSummary();

  return {
    success: true,
    config: config,
    state: state,
    lastRun: lastRun
  };
}

/**
 * Converts user input to a bounded safe number.
 *
 * @param {*} value Raw value.
 * @param {number} fallback Fallback value.
 * @return {number} Safe integer between 1 and 50.
 */
function safeNumber_(value, fallback) {
  var number = parseInt(value, 10);
  if (isNaN(number)) {
    number = fallback;
  }
  return Math.max(1, Math.min(50, number));
}
