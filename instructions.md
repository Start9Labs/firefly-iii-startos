# Firefly III

## Documentation

- [Firefly III documentation](https://github.com/firefly-iii/docs/tree/main/docs/docs) — the upstream user guide, covering accounts, budgets, bills, rules, reports and the Data Importer.

## What you get on StartOS

Two web interfaces. **Web Interface** is Firefly III itself, where you record and review your finances. **Data Importer** is the companion tool that pulls transactions in from CSV files or a connected bank, then hands them to Firefly III.

Your account is created by StartOS rather than by signing up in the browser, so nobody who happens to reach the address before you can claim the instance. Firefly III's own signup closes as soon as that account exists, and the Data Importer is connected to Firefly III for you — there are no keys to copy between the two.

Recurring transactions, automatic budgets, bill reminders and exchange-rate updates all depend on a scheduled job that most self-hosters have to set up themselves. Here it runs on its own.

## Getting set up

1. Open the task waiting for you and enter the email address you want to sign in with. It creates your account and shows you a password. **Copy the password before closing the result** — it is not kept on your server and cannot be shown again.
2. Start the service and open the **Web Interface**. Sign in with that email and password.
3. Firefly III asks for your bank name and opening balance to create your first asset account. From there you can add more accounts, budgets and bills.

## Using Firefly III

### Web interface

The full Firefly III application. Set your language, currency and time zone under **Options → Preferences** — the server itself runs on UTC, and each user chooses their own.

### Data importer

Open the **Data Importer** interface when you want to bring transactions in. It is already connected to Firefly III, so it goes straight to choosing what to import.

For a CSV file, it walks you through mapping columns to Firefly III fields and offers you that mapping as a file to download, so the next statement from the same bank imports in one step. For a connected bank, it uses one of the third-party providers Firefly III supports, which you sign up for separately.

### Actions

- **Reset Admin Password** — pick an account and get a new password for it, shown once. Run it if you have lost your password.
- **Set Primary URL** — chooses which of your addresses Firefly III treats as its own. It appears in the emails Firefly III sends and in the links the Data Importer uses to send you back. Set it to the address you actually use; a `.local` address is chosen for you at install.
- **Reissue Data Importer Token** — run this only if the Data Importer starts saying it cannot reach Firefly III, which happens if you revoke its access under **Options → Profile → OAuth**. It hands the importer a new key and retires the old one.
- **Configure Enable Banking** — paste the application ID and private key from your Enable Banking control panel, and the Data Importer can pull transactions straight from your banks. Enter them here rather than on the importer's own authentication page.
- **Configure SMTP** — needed for bill and subscription reminders and for the "forgot password" link. Without it, Firefly III writes those emails to its log instead of sending them.

## Limitations

Firefly III cannot move its data between database engines, and this package uses SQLite. If you later export your finances and rebuild elsewhere on PostgreSQL or MySQL, expect to re-enter rather than migrate — Firefly III's own export does not carry everything.
