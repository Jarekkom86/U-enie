/**
 * Returns the safe default configuration for Gmail Cleaner Control Center.
 *
 * Safety defaults:
 * - Dry-run is enabled by default.
 * - Archiving is disabled by default.
 * - No deletion/trash behavior is defined anywhere in this configuration.
 * - Sensitive rules explicitly disallow archiving.
 *
 * @return {Object} Gmail cleaner configuration object.
 */
function getDefaultConfig() {
  return {
    dryRunDefault: true,
    batchSizeDefault: 25,
    maxRuntimeSeconds: 240,
    allowArchiveDefault: false,
    liveConfirmationText: 'I UNDERSTAND - NO DELETE - LABEL ONLY',
    labels: [
      '00_DNES_URGENT',
      '01_ZAKAZNICI_OBJEDNAVKY',
      '02_SERVIS_AQARA',
      '03_DODAVATELIA',
      '04_GP_WEBPAY_BANKA',
      '05_KOMARENA_WEB',
      '06_AUKRO_MARKETPLACE',
      '07_FAKTURY_ADMIN',
      '08_CAKAM',
      '99_ARCHIV'
    ],
    rules: {
      faktury_admin: {
        label: '07_FAKTURY_ADMIN',
        query: 'in:inbox newer_than:365d (subject:(faktúra OR faktura OR invoice OR doklad OR receipt OR účtenka OR uctenka OR potvrdenie OR platba OR payment) OR filename:pdf)',
        archive: false,
        markRead: false,
        dryRun: true,
        allowArchive: false
      },
      urgent_security: {
        label: '00_DNES_URGENT',
        query: 'in:inbox newer_than:365d (subject:(bezpečnostné OR bezpečnostne OR security OR upozornenie OR verification OR overenie OR password OR heslo OR prihlásenie OR prihlasenie OR blocked OR zablokovaný OR blokovaný) OR from:(no-reply@accounts.google.com OR security-noreply@google.com OR noreply@google.com))',
        archive: false,
        markRead: false,
        dryRun: true,
        allowArchive: false
      },
      aukro_marketplace: {
        label: '06_AUKRO_MARKETPLACE',
        query: 'in:inbox newer_than:365d (from:aukro.sk OR from:aukro.cz OR subject:Aukro)',
        archive: false,
        markRead: false,
        dryRun: true,
        allowArchive: false
      },
      komarena_web: {
        label: '05_KOMARENA_WEB',
        query: 'in:inbox newer_than:365d (komarena OR WooCommerce OR WordPress OR wp-admin OR objednávka OR objednavka)',
        archive: false,
        markRead: false,
        dryRun: true,
        allowArchive: false
      },
      promo_archiv_candidate: {
        label: '99_ARCHIV',
        query: 'in:inbox category:promotions older_than:30d',
        archive: false,
        markRead: false,
        dryRun: true,
        allowArchive: true
      }
    }
  };
}
