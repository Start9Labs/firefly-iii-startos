import { T, utils } from '@start9labs/start-sdk'
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

export function getNonLocalUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(effects, uiHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === uiInterfaceId)
      return iface ? iface.addressInfo.nonLocal.format() : []
    })
    .const()
}
