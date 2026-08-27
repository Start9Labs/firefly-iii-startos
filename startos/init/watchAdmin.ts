import { createAdmin } from '../actions/createAdmin'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { taskId } from '../utils'

export const watchAdmin = sdk.setupOnInit(async (effects) => {
  const adminEmail = await storeJson.read((s) => s.adminEmail).const(effects)

  if (adminEmail) {
    await sdk.action.clearTask(effects, taskId(createAdmin))
    return
  }

  await sdk.action.createOwnTask(effects, createAdmin, 'critical', {
    reason: i18n(
      'Create your Firefly III account. Until you do, anyone who reaches the address could claim this instance.',
    ),
  })
})
