export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Firefly III!': 0,
  'Web Interface': 1,
  'Firefly III is ready': 2,
  'Firefly III is starting': 3,
  'Data Importer': 4,
  'The Data Importer is ready': 5,
  'The Data Importer is starting': 6,
  'Scheduled Tasks': 7,
  'Recurring transactions, auto-budgets and bill reminders are being processed': 8,

  // interfaces.ts
  'Manage your accounts, budgets, bills and transactions': 9,
  'Import transactions from files and connected banks into Firefly III': 10,

  // actions/createAdmin.ts
  'Email Address': 11,
  'The email address you sign in with. Firefly III also sends bill reminders and error reports here.': 12,
  'Create Admin Account': 13,
  'Create your Firefly III account and its first password. The password is shown once, here.': 14,
  'No Firefly III account exists with that email address.': 15,
  'Failed to set the Firefly III password.': 16,
  'Login Credentials': 17,
  'Save this password now — it is not stored on your server and cannot be shown again. Run this action again to replace it.': 18,
  Password: 19,

  // actions/resetAdminPassword.ts
  Account: 20,
  'Reset Admin Password': 21,
  'Generate a new password for a Firefly III account. The password is shown once, here.': 22,

  // actions/setPrimaryUrl.ts
  URL: 23,
  'Set Primary URL': 24,
  'Choose which of your addresses Firefly III treats as its own. It appears in emails and in links the Data Importer sends you back to.': 25,

  // actions/reissueImporterToken.ts
  'Reissue Data Importer Token': 26,
  'Give the Data Importer a fresh access token and revoke the one it was using. Run this if the Data Importer stops being able to reach Firefly III.': 27,
  'Create your Firefly III account first.': 28,
  'Data Importer Token Reissued': 29,
  'The Data Importer has a new token and the previous one no longer works. It restarts to pick the new one up.': 30,

  // actions/manageSmtp.ts
  'Configure SMTP': 31,
  'Add SMTP credentials so Firefly III can send bill reminders, password resets and error reports.': 32,

  // actions/manageEnableBanking.ts
  'Application ID': 35,
  'The ID of the application you registered in the Enable Banking control panel.': 36,
  'Private Key': 37,
  'The PEM file downloaded when the application was registered. Paste the whole file, including the BEGIN and END lines.': 38,
  'Configure Enable Banking': 39,
  'Add the Enable Banking credentials the Data Importer uses to pull transactions from your banks. Leave both fields empty to remove them.': 40,

  // init/watchAdmin.ts
  'Create your Firefly III account. Until you do, anyone who reaches the address could claim this instance.': 33,

  // init/taskSetPrimaryUrl.ts
  'Primary URL removed. Select a new primary URL.': 34,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
