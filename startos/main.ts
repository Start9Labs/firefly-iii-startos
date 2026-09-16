import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  appUser,
  fireflyBaseEnv,
  fireflyMounts,
  fireflyPort,
  importerFpmPort,
  importerMounts,
  importerPort,
  storagePath,
} from './utils'

// The importer image ships the core image's finalize-image.sh, which creates the
// core's storage tree rather than its own; and its php-fpm and nginx both take
// ports the core image already holds in the shared network namespace.
const prepareImporter = String.raw`set -e
cd /var/www/html/storage
mkdir -p app/public configurations conversion-routines debugbar \
  framework/cache/data framework/sessions framework/views \
  import-jobs jobs logs submission-routines upload uploads
chown -R "$APP_USER:$APP_USER" /var/www/html/storage
sed -i "s|^listen = 9000$|listen = $FPM_PORT|" \
  /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf
sed -i "s|127\.0\.0\.1:9000|127.0.0.1:$FPM_PORT|g" \
  /etc/nginx/site-opts.d/http.conf.template
grep -q "^listen = $FPM_PORT$" /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf
! grep -q "9000" /etc/nginx/site-opts.d/http.conf.template
`

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting Firefly III!'))

  const store = await storeJson.read().const(effects)
  if (!store?.appKey || !store.cronToken) {
    throw new Error('store.json is missing generated secrets')
  }
  const {
    appKey,
    cronToken,
    primaryUrl,
    adminEmail,
    importerToken,
    smtp,
    enableBanking,
  } = store

  let smtpCredentials: T.SmtpValue | null = null
  if (smtp.selection === 'system') {
    smtpCredentials = await sdk.getSystemSmtp(effects).const()
    const customFrom = smtp.value.customFrom as string | undefined
    if (smtpCredentials && customFrom) smtpCredentials.from = customFrom
  } else if (smtp.selection === 'custom') {
    const { host, from, username, password, security } =
      smtp.value.provider.value
    smtpCredentials = {
      host,
      from,
      username,
      password: password ?? null,
      port: Number(security.value.port),
      security: security.selection,
    }
  }

  const mailEnv: Record<string, string> = smtpCredentials
    ? {
        MAIL_MAILER: 'smtp',
        MAIL_HOST: smtpCredentials.host,
        MAIL_PORT: String(smtpCredentials.port),
        MAIL_FROM: smtpCredentials.from,
        MAIL_USERNAME: smtpCredentials.username,
        MAIL_PASSWORD: smtpCredentials.password ?? '',
        MAIL_SCHEME: smtpCredentials.security === 'tls' ? 'smtps' : 'smtp',
      }
    : { MAIL_MAILER: 'log' }

  const fireflySub = sdk.SubContainer.of(
    effects,
    { imageId: 'firefly' },
    fireflyMounts,
    'firefly-sub',
  )

  const importerSub = sdk.SubContainer.of(
    effects,
    { imageId: 'data-importer' },
    importerMounts,
    'importer-sub',
  )

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects)
    .addOneshot('firefly-chown', {
      subcontainer: fireflySub,
      exec: {
        command: ['chown', '-R', `${appUser}:${appUser}`, storagePath],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('firefly', {
      subcontainer: fireflySub,
      exec: {
        command: sdk.useEntrypoint(),
        runAsInit: true,
        env: {
          ...fireflyBaseEnv(appKey),
          APP_URL: primaryUrl,
          SITE_OWNER: adminEmail ?? '',
          STATIC_CRON_TOKEN: cronToken,
          ...mailEnv,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${fireflyPort}/health`,
            {
              successMessage: i18n('Firefly III is ready'),
              errorMessage: i18n('Firefly III is starting'),
            },
          ),
      },
      requires: ['firefly-chown'],
    })
    .addOneshot('importer-prepare', {
      subcontainer: importerSub,
      exec: {
        command: ['sh', '-c', prepareImporter],
        user: 'root',
        env: { APP_USER: appUser, FPM_PORT: String(importerFpmPort) },
      },
      requires: [],
    })
    .addDaemon('importer', {
      subcontainer: importerSub,
      exec: {
        command: sdk.useEntrypoint(),
        runAsInit: true,
        env: {
          APP_ENV: 'production',
          NGINX_HTTP_PORT: String(importerPort),
          FIREFLY_III_URL: `http://127.0.0.1:${fireflyPort}`,
          VANITY_URL: primaryUrl,
          FIREFLY_III_ACCESS_TOKEN: importerToken ?? '',
          ENABLE_BANKING_APP_ID: enableBanking?.appId ?? '',
          // Importer 2.3.4 crashes on an empty key (firefly-iii#12493).
          ENABLE_BANKING_PRIVATE_KEY:
            enableBanking?.privateKey || 'not-configured',
          TRUSTED_PROXIES: '**',
          TZ: 'UTC',
        },
      },
      ready: {
        display: i18n('Data Importer'),
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${importerPort}/`,
            {
              successMessage: i18n('The Data Importer is ready'),
              errorMessage: i18n('The Data Importer is starting'),
            },
          ),
      },
      requires: ['importer-prepare', 'firefly'],
    })
    .addDaemon('cron', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'firefly' },
        sdk.Mounts.of(),
        'cron-sub',
      ),
      exec: {
        command: [
          'sh',
          '-c',
          `while true; do curl -fsS -o /dev/null "http://127.0.0.1:${fireflyPort}/api/v1/cron/$CRON_TOKEN" || echo "cron request failed"; sleep 3600; done`,
        ],
        env: { CRON_TOKEN: cronToken },
      },
      ready: {
        display: i18n('Scheduled Tasks'),
        fn: async () => ({
          result: 'success',
          message: i18n(
            'Recurring transactions, auto-budgets and bill reminders are being processed',
          ),
        }),
      },
      requires: ['firefly'],
    })
})
