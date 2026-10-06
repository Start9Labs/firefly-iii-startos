import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { primaryUrl } from '../primaryUrl'
import { sdk } from '../sdk'

export const seedPrimaryUrl = sdk.setupOnInit(async (effects) => {
  if (await storeJson.read((s) => s.primaryUrl).const(effects)) return
  const url = await primaryUrl.bestUsable(effects).const()
  if (url) {
    await storeJson.merge(
      effects,
      { primaryUrl: url },
      { allowWriteAfterConst: true },
    )
  }
})

export const taskPrimaryUrl = primaryUrl.setupTask('critical', {
  reason: i18n('Primary URL removed. Select a new primary URL.'),
})
