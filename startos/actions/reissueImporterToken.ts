import { storeJson } from '../fileModels/store.json'
import { withFireflyCli } from '../fireflyCli'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const reissueImporterToken = sdk.Action.withoutInput(
  // id
  'reissue-importer-token',

  // metadata
  async ({ effects }) => ({
    name: i18n('Reissue Data Importer Token'),
    description: i18n(
      'Give the Data Importer a fresh access token and revoke the one it was using. Run this if the Data Importer stops being able to reach Firefly III.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const store = await storeJson.read().once()
    if (!store?.appKey || !store.adminEmail) {
      throw new Error(i18n('Create your Firefly III account first.'))
    }

    const importerToken = await withFireflyCli(
      effects,
      store.appKey,
      store.adminEmail,
      'reissue-importer-token',
      (cli) => cli.mintImporterToken(store.adminEmail!),
    )
    await storeJson.merge(effects, { importerToken })

    return {
      version: '1',
      title: i18n('Data Importer Token Reissued'),
      message: i18n(
        'The Data Importer has a new token and the previous one no longer works. It restarts to pick the new one up.',
      ),
      result: null,
    }
  },
)
