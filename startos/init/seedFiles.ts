import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getKey32 } from '../utils'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {
      appKey: getKey32(),
      cronToken: getKey32(),
      smtp: { selection: 'disabled', value: {} },
    })
  } else {
    await storeJson.merge(effects, {})
  }
})
