import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  fireflyPort,
  importerHostId,
  importerInterfaceId,
  importerPort,
  uiHostId,
  uiInterfaceId,
} from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, uiHostId)
  const uiOrigin = await uiMulti.bindPort(fireflyPort, { protocol: 'http' })

  const ui = sdk.createInterface(effects, {
    name: i18n('Web Interface'),
    id: uiInterfaceId,
    description: i18n('Manage your accounts, budgets, bills and transactions'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const importerMulti = sdk.MultiHost.of(effects, importerHostId)
  const importerOrigin = await importerMulti.bindPort(importerPort, {
    protocol: 'http',
    preferredExternalPort: importerPort,
  })

  const importer = sdk.createInterface(effects, {
    name: i18n('Data Importer'),
    id: importerInterfaceId,
    description: i18n(
      'Import transactions from files and connected banks into Firefly III',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  return [await uiOrigin.export([ui]), await importerOrigin.export([importer])]
})
