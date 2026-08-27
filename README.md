<p align="center">
  <img src="icon.svg" alt="Firefly III Logo" width="21%">
</p>

# Firefly III on StartOS

> Everything not listed in this document should behave the same as upstream
> Firefly III. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

Firefly III is a double-entry personal finance manager: accounts, budgets, bills, piggy banks, rules and reports over a full transaction history. This package ships it alongside the Firefly III Data Importer, the companion application that brings transactions in from files and connected banks. Upstream: <https://github.com/firefly-iii/firefly-iii>.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Both upstream images are used unmodified, on `x86_64` and `aarch64`. Each bundles nginx, php-fpm and an s6-overlay supervisor, so both daemons run the image entrypoint as PID 1 (`runAsInit`).

| Subcontainer  | Image             | What it runs                                                        |
| ------------- | ----------------- | -------------------------------------------------------------------- |
| `firefly-sub` | Firefly III core  | nginx + php-fpm serving the application                             |
| `importer-sub`| Data Importer     | nginx + php-fpm serving the importer                                |
| `cron-sub`    | Firefly III core  | a `curl` loop against Firefly III's own cron endpoint, no volume    |

Both images bind port 8080 and php-fpm 9000, and StartOS subcontainers share one network namespace, so the `importer-prepare` oneshot moves the importer's nginx to 8081 (via `NGINX_HTTP_PORT`) and rewrites its php-fpm pool and nginx template to 9001 before the daemon starts. It asserts both rewrites landed and fails the chain if either did not, because a silent miss would put two php-fpm instances on the same port.

That same oneshot creates the importer's storage tree. The importer image ships the **core** image's `finalize-image.sh`, which creates the core's directories rather than its own — without the fix, every importer page returns `Make sure that directory "/var/www/html/storage/uploads" exists and is writeable.`

A `firefly-chown` oneshot gives `www-data` ownership of the main volume, which StartOS mounts root-owned.

## Volume and Data Layout

Three volumes, none shared between the two applications.

| Volume     | Mounted at                  | Holds                                                                                     |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| `main`     | `/var/www/html/storage` (core)     | the SQLite database, attachments, exports, the Passport OAuth keypair, sessions, logs |
| `importer` | `/var/www/html/storage` (importer) | the importer's sessions, cache, logs and in-flight wizard state                      |
| `startos`  | not mounted into any container     | `store.json`                                                                         |

The database is embedded SQLite at `main`'s `database/database.sqlite`, created by the image's own entrypoint. There is no database server.

`main` also carries `oauth-private.key` / `oauth-public.key`, generated on first start. Losing them invalidates every Personal Access Token, including the one the Data Importer holds.

## File Models

`store.json`, on the `startos` volume, is the only file this package owns. Firefly III itself is configured entirely through environment variables — it reads no `.env` file in this image — so there is no upstream configuration file on disk to model or to hand-edit.

| Key                | Seeded                       | Rewritten by                                       |
| ------------------ | ---------------------------- | -------------------------------------------------- |
| `appKey`           | generated at install         | never                                              |
| `cronToken`        | generated at install         | never                                              |
| `primaryUrl`       | a `.local` address at install| `set-primary-url`                                  |
| `adminEmail`       | unset                        | `create-admin`                                     |
| `importerToken`    | issued by `create-admin`     | `reissue-importer-token`                           |
| `smtp`             | `disabled` at install        | `manage-smtp`                                      |

**`appKey` is data-bearing.** Firefly III encrypts attachments, user preferences and application configuration with it. It is generated once at install and never rotated; a lost or changed value makes existing attachments and preferences unreadable, not merely logs everyone out.

No admin password is stored. `create-admin` and `reset-admin-password` write it into Firefly III's own user table through the application's hasher and return it to the caller once; `adminEmail` records which account the package owns, and is what decides whether the first-run task is raised.

`importerToken` is a Firefly III Personal Access Token the package issues to itself, through the same token factory the application's own OAuth page uses. It is internal plumbing between the two components and is never shown to the user.

Every value reaches the containers as an environment variable, read on each launch, so a change plus the restart `main` performs is enough to apply it.

## Dependencies

None.

## Network Access and Interfaces

Two web interfaces, on separate hosts so their addresses can be enabled independently.

| Interface  | Host id     | Type | Internal port | Serves                                                              |
| ---------- | ----------- | ---- | ------------- | --------------------------------------------------------------------- |
| `ui`       | `ui`        | `ui` | 8080          | Firefly III itself                                                    |
| `importer` | `importer`  | `ui` | 8081          | the Data Importer                                                     |

Both bind as `protocol: 'http'`, which has StartOS add `X-Forwarded-Proto` and `X-Forwarded-For`. Both applications are given `TRUSTED_PROXIES=**` so they honour those headers; without that pairing every asset URL Firefly III generates comes out `http://` and the browser blocks it as mixed content.

The Data Importer reaches Firefly III at `http://127.0.0.1:8080` inside the shared network namespace, never over an external address.

## Installation and First-Run Flow

The package creates the Firefly III account rather than leaving upstream's signup page to whoever reaches the address first. Install raises a `critical` task pointing at `create-admin`, which holds the service stopped until it is run.

That action does the whole bootstrap. When no database exists yet it runs the image's `finalize-image.sh` and `entrypoint.sh` in a temporary subcontainer, which creates the schema and the OAuth keypair; then it creates the owner with upstream's `system:create-first-user`, applies a generated password, and issues the Data Importer its access token. Once one account exists, Firefly III's `single_user_mode` — on by default — closes `/register` on its own, so no separate registration-gating action is needed.

Nothing is left for the user to wire up between the two components: the Data Importer is authenticated to Firefly III from the moment the account exists.

`primaryUrl` is seeded with a `.local` address at install so the service has a usable `APP_URL` before the user chooses one.

## Actions

Five actions. `create-admin` is `visibility: 'hidden'` — it exists to satisfy the install task and is not somewhere a user should be sent; the other four are user-facing.

Creation and rotation are separate because their inputs are: creation must accept an email address that does not exist yet, so it takes free text, while rotation picks from the accounts that do exist and so takes a dropdown. One action could not offer both.

**`create-admin`** (hidden) — runs once, from the install task. It builds the database schema if none exists, creates the account with upstream's own `system:create-first-user`, applies a generated password, and issues the Data Importer its access token. Up to a minute, most of it schema creation. Re-running it against an existing account rotates that account's password and reissues the importer token rather than creating a second account. The returned password is the only copy — nothing on the server retains it.

**`reset-admin-password`** — run when a password is lost. The account is chosen from a dropdown of the Firefly III accounts that actually exist, defaulting to the one the package created; building that list starts a temporary container, so the form takes a few seconds to open. Seconds to run, writes only to Firefly III's user table, and does not restart the service or touch the Data Importer's token.

**`set-primary-url`** — run when the address people actually use changes, or when the task below appears. Writes `primaryUrl` to `store.json`, which restarts both daemons to re-apply `APP_URL` and `VANITY_URL`. Idempotent. The choices come from the `ui` interface's non-local addresses, so a host with no addresses yet renders an empty dropdown.

**`reissue-importer-token`** — run when the Data Importer stops being able to reach Firefly III, which in practice means its token was revoked from Firefly III's own OAuth page. Mints a replacement through the application's token factory, revokes every prior token issued under the same name, and writes it to `store.json`, which restarts the importer. Seconds; each run replaces the last. It needs an account to exist and says so plainly when one does not.

**`manage-smtp`** — run to enable outbound email. Writes `smtp` to `store.json` and restarts Firefly III. Without it `MAIL_MAILER=log`, so Firefly III writes would-be mail to its log; bill reminders and the password-reset link therefore do nothing. Idempotent.

## Tasks

Two tasks, both `critical`, both raised from init watchers.

**Create the administrator account.** Raised whenever `store.json` has no `adminEmail` — which is every fresh install, and any restore of a backup taken before the account was created. Cleared by running `create-admin`, and by the watcher itself once `adminEmail` is set — a restore can set it without the action running. Because it is `critical` the service will not start while it stands, which is deliberate: an unclaimed Firefly III is claimable by anyone who can reach it.

**Select a new primary URL.** Raised only when the stored URL's **host** is gone from the `ui` interface's addresses — the user removed the gateway or domain it named. Cleared by running `set-primary-url`, and by the watcher itself as soon as a usable URL is stored again. It can return if the newly chosen host is later removed too. It is not raised on a fresh install, where the watcher seeds a `.local` address instead, nor when only the port changed: StartOS reassigns external ports on every reinstall and restore, so the watcher re-anchors the stored URL to the same host on its new port rather than prompting for a choice the user already made.

## Health Checks

Three daemon readiness checks; the package declares no standalone health checks.

**Web Interface** fetches Firefly III's own `/health` endpoint. It stays not-ready through schema creation and migration, which on a fresh volume or a large upgrade is the slow part — minutes, not seconds. Persistent failure with the daemon alive usually means the entrypoint's migration step aborted; the service log carries the PHP stack trace.

**Data Importer** fetches the importer's root, which redirects to its token page. It waits on Firefly III, so a failure here while Firefly III is also not ready is a consequence, not a separate fault. Failing alone points at the `importer-prepare` oneshot — check the log for its `grep` assertions on the php-fpm and nginx port rewrites.

**Scheduled Tasks** reports the cron loop is alive. It cannot fail without the daemon dying, so the thing to check is the log: each hour's request either succeeds silently or logs `cron request failed`.

## Backups and Restore

`main` and `startos` are copied wholesale — `Backups.ofVolumes`, no database dump. StartOS stops the service for the duration, so the SQLite file is quiescent when it is copied and needs no separate consistency step.

**The `importer` volume is deliberately excluded.** Nothing the Data Importer writes there outlives an import: sessions, cache, logs, and the wizard state of an import in progress. Its `configurations` disk looks like an exception and is not one — the importer only ever reads that directory, and the UI's "save configuration" hands the user a file to download rather than storing one. An import interrupted by the backup's own service stop is redone by re-uploading the file.

A restored instance is immediately usable — credentials, `appKey` and the OAuth keypair all come back, so the Personal Access Token the Data Importer holds keeps working. The primary URL follows its host onto whatever external port the restore assigns; only a restore onto a server that no longer has that host at all raises the primary-URL task.

## Limitations and Differences

1. **The database is SQLite and cannot be changed.** Firefly III does not support migrating between database engines, and its own export is not complete enough to substitute. A user who later wants PostgreSQL or MySQL is rebuilding, not migrating.
2. **The Data Importer's session encryption key is a constant compiled into the upstream image**, identical in every deployment worldwide, and the image offers no way to override it. This package keeps credentials out of that session entirely — the access token reaches the importer as an environment variable — so the exposure is limited to whatever an import in progress puts there.
3. **Third-party bank connections need accounts elsewhere.** The Data Importer's GoCardless, SaltEdge and SimpleFIN integrations require credentials from those providers, which this package does not supply or configure.
4. **The containers run on UTC.** Firefly III's per-user time-zone preference is the place to set a local zone; there is no package-level setting.
5. **Firefly III's version-update check and external exchange-rate download stay off**, as they are upstream. Both are administrator settings inside the application if wanted.

---

## Quick Reference for AI Consumers

```yaml
package_id: firefly-iii
image:
  - fireflyiii/core
  - fireflyiii/data-importer
architectures: [x86_64, aarch64]
subcontainers: [firefly-sub, importer-sub, cron-sub]
volumes:
  main: /var/www/html/storage        # backed up
  importer: /var/www/html/storage    # not backed up
  startos: not mounted               # backed up
file_models:
  - store.json
startos_managed_env_vars:
  - APP_ENV
  - APP_KEY
  - APP_URL
  - DB_CONNECTION
  - SITE_OWNER
  - STATIC_CRON_TOKEN
  - TRUSTED_PROXIES
  - TZ
  - MAIL_MAILER
  - MAIL_HOST
  - MAIL_PORT
  - MAIL_FROM
  - MAIL_USERNAME
  - MAIL_PASSWORD
  - MAIL_SCHEME
  - NGINX_HTTP_PORT
  - FIREFLY_III_URL
  - VANITY_URL
  - FIREFLY_III_ACCESS_TOKEN
dependencies: none
interfaces:
  ui: { type: ui, port: 8080 }
  importer: { type: ui, port: 8081 }
actions:
  - create-admin
  - reset-admin-password
  - set-primary-url
  - reissue-importer-token
  - manage-smtp
tasks:
  - { action: create-admin, severity: critical }
  - { action: set-primary-url, severity: critical }
health_checks:
  - firefly
  - importer
  - cron
```
