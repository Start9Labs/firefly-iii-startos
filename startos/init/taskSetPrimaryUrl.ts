import { setPrimaryUrl } from '../actions/setPrimaryUrl'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls, taskId } from '../utils'

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

export const taskSetPrimaryUrl = sdk.setupOnInit(async (effects) => {
  const availableUrls = await getNonLocalUrls(effects)
  const primaryUrl = await storeJson.read((s) => s.primaryUrl).const(effects)

  if (primaryUrl && availableUrls.includes(primaryUrl)) {
    await sdk.action.clearTask(effects, taskId(setPrimaryUrl))
    return
  }

  // A restore reassigns external ports, so match on the host the user chose.
  const replacement = primaryUrl
    ? availableUrls.find((u) => hostOf(u) === hostOf(primaryUrl))
    : availableUrls.find((u) => u.includes('.local'))

  if (replacement) {
    await storeJson.merge(
      effects,
      { primaryUrl: replacement },
      { allowWriteAfterConst: true },
    )
    await sdk.action.clearTask(effects, taskId(setPrimaryUrl))
  } else if (primaryUrl) {
    await sdk.action.createOwnTask(effects, setPrimaryUrl, 'critical', {
      reason: i18n('Primary URL removed. Select a new primary URL.'),
    })
  }
})
