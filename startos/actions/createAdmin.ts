import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { withFireflyCli } from '../fireflyCli'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getPassword } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  email: Value.text({
    name: i18n('Email Address'),
    description: i18n(
      'The email address you sign in with. Firefly III also sends bill reminders and error reports here.',
    ),
    required: true,
    default: null,
    patterns: [utils.Patterns.email],
  }),
})

export const createAdmin = sdk.Action.withInput(
  // id
  'create-admin',

  // metadata
  async ({ effects }) => ({
    name: i18n('Create Admin Account'),
    description: i18n(
      'Create your Firefly III account and its first password. The password is shown once, here.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    // Reached through the install task; afterwards the reset action is the
    // one that applies.
    visibility: 'hidden',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({}),

  // the execution function
  async ({ effects, input }) => {
    const password = getPassword()
    const appKey = await storeJson.read((s) => s.appKey).once()
    if (!appKey)
      throw new Error(i18n('Failed to set the Firefly III password.'))

    const importerToken = await withFireflyCli(
      effects,
      appKey,
      input.email,
      'create-admin',
      async (cli) => {
        if (!(await cli.sqliteExists())) await cli.bootstrap()
        if ((await cli.count()) === 0) await cli.createFirstUser(input.email)

        if (!(await cli.setPassword(input.email, password))) {
          throw new Error(
            i18n('No Firefly III account exists with that email address.'),
          )
        }
        return cli.mintImporterToken(input.email)
      },
    )

    await storeJson.merge(effects, { adminEmail: input.email, importerToken })

    return {
      version: '1',
      title: i18n('Login Credentials'),
      message: i18n(
        'Save this password now — it is not stored on your server and cannot be shown again. Run this action again to replace it.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Email Address'),
            description: null,
            value: input.email,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
