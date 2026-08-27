import { storeJson } from '../fileModels/store.json'
import { withFireflyCli } from '../fireflyCli'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getPassword } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  email: Value.dynamicSelect(async ({ effects }) => {
    const store = await storeJson.read().once()
    const accounts =
      store?.appKey && store.adminEmail
        ? await withFireflyCli(
            effects,
            store.appKey,
            store.adminEmail,
            'list-firefly-accounts',
            (cli) => cli.listUsers(),
          )
        : []

    return {
      name: i18n('Account'),
      values: accounts.reduce(
        (obj, email) => ({ ...obj, [email]: email }),
        {} as Record<string, string>,
      ),
      default: store?.adminEmail ?? accounts[0] ?? '',
    }
  }),
})

export const resetAdminPassword = sdk.Action.withInput(
  // id
  'reset-admin-password',

  // metadata
  async ({ effects }) => ({
    name: i18n('Reset Admin Password'),
    description: i18n(
      'Generate a new password for a Firefly III account. The password is shown once, here.',
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
    email: (await storeJson.read((s) => s.adminEmail).once()) || undefined,
  }),

  // the execution function
  async ({ effects, input }) => {
    const password = getPassword()
    const appKey = await storeJson.read((s) => s.appKey).once()
    if (!appKey)
      throw new Error(i18n('Failed to set the Firefly III password.'))

    const applied = await withFireflyCli(
      effects,
      appKey,
      input.email,
      'reset-admin-password',
      (cli) => cli.setPassword(input.email, password),
    )
    if (!applied) {
      throw new Error(
        i18n('No Firefly III account exists with that email address.'),
      )
    }

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
