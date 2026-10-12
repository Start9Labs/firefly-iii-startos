import { utils } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { manifest } from './manifest'
import { sdk } from './sdk'

export const fireflyPort = 8080
export const importerPort = 8081

// The core image's php-fpm owns 9000; subcontainers share one network
// namespace, so the importer's has to move.
export const importerFpmPort = 9001

export const appPath = '/var/www/html'
export const storagePath = `${appPath}/storage`
export const sqlitePath = `${storagePath}/database/database.sqlite`

export const uiHostId = 'ui'
export const uiInterfaceId = 'ui'
export const importerHostId = 'importer'
export const importerInterfaceId = 'importer'

export const appUser = 'www-data'

// The replay key `createOwnTask` derives, needed to clear a task the watcher
// no longer raises.
export const taskId = (action: { id: string }) => `${manifest.id}:${action.id}`

export function getKey32(): string {
  return utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 })
}

export function getPassword(): string {
  return utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 24 })
}

export function loginCredentialsResult(email: string, password: string) {
  return {
    version: '1' as const,
    title: i18n('Login Credentials'),
    message: i18n(
      'Save this password now — it is not stored on your server and cannot be shown again. Run this action again to replace it.',
    ),
    result: {
      type: 'group' as const,
      value: [
        {
          type: 'single' as const,
          name: i18n('Email Address'),
          description: null,
          value: email,
          masked: false,
          copyable: true,
          qr: false,
          launchable: false,
        },
        {
          type: 'single' as const,
          name: i18n('Password'),
          description: null,
          value: password,
          masked: true,
          copyable: true,
          qr: false,
          launchable: false,
        },
      ],
    },
  }
}

// Every `artisan` invocation needs these, the image's own entrypoint included.
export function fireflyBaseEnv(appKey: string): Record<string, string> {
  return {
    APP_ENV: 'production',
    APP_KEY: appKey,
    DB_CONNECTION: 'sqlite',
    TRUSTED_PROXIES: '**',
    TZ: 'UTC',
  }
}

export const fireflyMounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: storagePath,
  readonly: false,
})

export const importerMounts = sdk.Mounts.of().mountVolume({
  volumeId: 'importer',
  subpath: null,
  mountpoint: storagePath,
  readonly: false,
})
