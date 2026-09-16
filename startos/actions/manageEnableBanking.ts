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
      'The PEM file downloaded when the application was registered. Paste the whole file, including the BEGIN and END lines. Leave it empty to keep the key already stored.',
    ),
    required: false,
    default: null,
    patterns: [
      {
        regex: '^-----BEGIN [A-Z ]*PRIVATE KEY-----',
        description: i18n(
          'Must be the whole PEM file, starting with its BEGIN PRIVATE KEY line.',
        ),
      },
    ],
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
  async ({ effects }) => ({
    appId: (await storeJson.read((s) => s.enableBanking?.appId).once()) ?? null,
    privateKey: null,
  }),

  // the execution function
  async ({ effects, input }) => {
    const appId = input.appId ?? ''
    const privateKey =
      input.privateKey ||
      (appId
        ? ((await storeJson.read((s) => s.enableBanking?.privateKey).once()) ??
          '')
        : '')
    if (!!appId !== !!privateKey) {
      throw new Error(
        i18n(
          'Enter both the Application ID and the Private Key, or leave both empty to remove them.',
        ),
      )
    }
    await storeJson.merge(effects, { enableBanking: { appId, privateKey } })
  },
)
