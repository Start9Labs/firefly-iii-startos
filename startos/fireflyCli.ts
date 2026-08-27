import { T } from '@start9labs/start-sdk'
import { readFile, writeFile } from 'node:fs/promises'
import { sdk } from './sdk'
import { appUser, fireflyBaseEnv, fireflyMounts, storagePath } from './utils'

const helperPath = '/tmp/firefly-helper.php'
const outPath = '/tmp/firefly-out'

export const importerTokenName = 'StartOS Data Importer'

// Firefly III ships no command for either of these; each goes through the same
// model, hasher and token factory its own code does. Results come back in a
// file because the application logs to stdout.
const helperSource = String.raw`<?php
require '/var/www/html/vendor/autoload.php';
$app = require '/var/www/html/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$out = static fn (string $value) => file_put_contents('__OUT__', $value);
$user = static fn (string $email) => FireflyIII\User::where('email', $email)->first();

switch ($argv[1] ?? '') {
    case 'count':
        $out((string) FireflyIII\User::count());
        exit(0);

    case 'list-users':
        $out(FireflyIII\User::orderBy('id')->pluck('email')->implode("\n"));
        exit(0);

    case 'set-password':
        $account = $user($argv[2]);
        if (null === $account) {
            exit(2);
        }
        $account->password = Illuminate\Support\Facades\Hash::make($argv[3]);
        $account->save();
        exit(0);

    case 'mint-token':
        $account = $user($argv[2]);
        if (null === $account) {
            exit(2);
        }
        $existing = Illuminate\Support\Facades\DB::table('oauth_clients')
            ->where('grant_types', '["personal_access"]')
            ->whereNull('owner_id')
            ->count();
        if (0 === $existing) {
            app(Laravel\Passport\ClientRepository::class)
                ->createPersonalAccessGrantClient('Firefly III Personal Access Grant Client', null);
        }
        $account->tokens()->where('name', $argv[3])->update(['revoked' => true]);
        $out($account->createToken($argv[3])->accessToken);
        exit(0);
}
exit(1);
`.replace('__OUT__', outPath)

export type FireflyCli = {
  /** Number of Firefly III accounts. */
  count(): Promise<number>
  /** Every Firefly III account's email address, oldest first. */
  listUsers(): Promise<string[]>
  /** Applies a password to an existing account; false when no account matches. */
  setPassword(email: string, password: string): Promise<boolean>
  /** Issues the Data Importer a token, revoking the one it replaces. */
  mintImporterToken(email: string): Promise<string>
  /** Runs the image's own first-start sequence, creating the schema. */
  bootstrap(): Promise<void>
  /** Creates the first account with upstream's own command. */
  createFirstUser(email: string): Promise<void>
  sqliteExists(): Promise<boolean>
}

export async function withFireflyCli<T>(
  effects: T.Effects,
  appKey: string,
  email: string,
  name: string,
  fn: (cli: FireflyCli) => Promise<T>,
): Promise<T> {
  const env = {
    ...fireflyBaseEnv(appKey),
    SITE_OWNER: email,
    // An unreachable SMTP server would hang these commands.
    MAIL_MAILER: 'log',
  }

  return sdk.SubContainer.withTemp(
    effects,
    { imageId: 'firefly' },
    fireflyMounts,
    name,
    async (sub) => {
      const rootfs = await sub.rootfs
      await writeFile(`${rootfs}${helperPath}`, helperSource)
      await sub.execFail(
        ['chown', '-R', `${appUser}:${appUser}`, storagePath],
        { user: 'root' },
      )

      const read = () => readFile(`${rootfs}${outPath}`, 'utf8')
      const run = (...args: string[]) =>
        sub.exec(['php', helperPath, ...args], { env })

      return fn({
        sqliteExists: async () =>
          (
            await sub.exec([
              'test',
              '-s',
              `${storagePath}/database/database.sqlite`,
            ])
          ).exitCode === 0,

        bootstrap: async () => {
          await sub.execFail(
            ['/usr/local/bin/finalize-image.sh'],
            { env },
            null,
          )
          await sub.execFail(['/usr/local/bin/entrypoint.sh'], { env }, null)
        },

        createFirstUser: async (email) => {
          // `system:create-first-user` reads app.env, which the entrypoint caches.
          await sub.execFail(['php', 'artisan', 'config:clear'], { env })
          await sub.execFail(
            ['php', 'artisan', 'system:create-first-user', email],
            { env: { ...env, APP_ENV: 'testing' } },
            null,
          )
        },

        count: async () => {
          const { exitCode } = await run('count')
          if (exitCode !== 0) throw new Error('firefly helper: count failed')
          return Number(await read())
        },

        listUsers: async () => {
          const { exitCode } = await run('list-users')
          if (exitCode !== 0)
            throw new Error('firefly helper: list-users failed')
          return (await read()).split('\n').filter(Boolean)
        },

        setPassword: async (email, password) => {
          const { exitCode } = await run('set-password', email, password)
          if (exitCode === 2) return false
          if (exitCode !== 0)
            throw new Error('firefly helper: set-password failed')
          return true
        },

        mintImporterToken: async (email) => {
          const { exitCode } = await run('mint-token', email, importerTokenName)
          if (exitCode !== 0)
            throw new Error('firefly helper: mint-token failed')
          return read()
        },
      })
    },
  )
}
