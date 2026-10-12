# Updating the upstream version

This package wraps two upstream Docker images, both pinned by tag in
`startos/manifest/index.ts`. Neither is built here.

- `firefly` — `fireflyiii/core`, the application. Its version is the package's upstream
  version, so bumping it is what moves `startos/versions/current.ts`.
- `data-importer` — `fireflyiii/data-importer`, the companion import tool. It has its own
  release line and is refreshed alongside an application update or an approved wrapper
  change, never as the trigger for a release.

## Determining the upstream version

Read the tag lists rather than trusting GitHub's Latest badge. Ignore `develop-*` tags,
which are nightly prereleases, and confirm that the selected release is stable.

```bash
gh api 'repos/firefly-iii/firefly-iii/tags?per_page=100' --jq '.[].name'
gh api 'repos/firefly-iii/data-importer/tags?per_page=100' --jq '.[].name'
gh release view vX.Y.Z -R firefly-iii/firefly-iii --json tagName,isPrerelease,body
```

Both projects publish a GitHub release `vX.Y.Z` and a Docker tag `version-X.Y.Z`. Confirm
the Docker tag exists before pinning it — a release can precede its image by minutes:

```bash
curl -fsSL "https://hub.docker.com/v2/repositories/fireflyiii/core/tags/version-X.Y.Z" \
  | jq '{name, tag_status, images: [.images[] | {os, architecture, status}]}'
```

The tag must include active Linux images for both `amd64` and `arm64`. Check
`fireflyiii/data-importer` the same way when refreshing its pin. If the newest stable
release has no usable image, select the newest stable release that does.

## Applying the bump

1. Set `images.firefly.source.dockerTag` (and/or `images.data-importer.source.dockerTag`)
   in `startos/manifest/index.ts`.
2. Set `version` in `startos/versions/current.ts` to `<firefly-version>:<revision>`, and
   write release notes in all five locales.
3. Read upstream's release notes for a manual upgrade step. Firefly III migrates its own
   schema on start, but major releases occasionally document a one-off command; if one
   appears, it belongs in the package rather than in a user instruction.
