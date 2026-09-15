import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  appId: Value.text({
    name: i18n('Application ID'),
    description: i18n(
      'The ID of the application you registered in the Enable Banking control panel.',
    ),
    required: false,
    default: null,
  }),
  privateKey: Value.textarea({
    name: i18n('Private Key'),
    description: i18n(
      'The PEM file downloaded when the application was registered. Paste the whole file, including the BEGIN and END lines.',
    ),
    required: false,
    default: null,
  }),
})

export const manageEnableBanking = sdk.Action.withInput(
  // id
  'manage-enable-banking',

  // metadata
  async ({ effects }) => ({
    name: i18n('Configure Enable Banking'),
    description: i18n(
      'Add the Enable Banking credentials the Data Importer uses to pull transactions from your banks. Leave both fields empty to remove them.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const eb = await storeJson.read((s) => s.enableBanking).once()
    return { appId: eb?.appId ?? null, privateKey: eb?.privateKey ?? null }
  },

  // the execution function
  async ({ effects, input }) =>
    storeJson.merge(effects, {
      enableBanking: {
        appId: input.appId ?? '',
        privateKey: input.privateKey ?? '',
      },
    }),
)
