# Updating the upstream version

This package wraps two upstream Docker images, both pinned by tag in
`startos/manifest/index.ts`. Neither is built here.

- `firefly` — `fireflyiii/core`, the application. Its version is the package's upstream
  version, so bumping it is what moves `startos/versions/current.ts`.
- `data-importer` — `fireflyiii/data-importer`, the companion import tool. It has its own
  release line and is bumped independently; a bump here is a downstream revision.

## Determining the upstream version

Firefly III's GitHub releases are the source of truth. Ignore `develop-*` tags, which are
nightly prereleases.

```bash
gh release view -R firefly-iii/firefly-iii --json tagName -q .tagName
gh release view -R firefly-iii/data-importer --json tagName -q .tagName
```

Both projects publish a GitHub release `vX.Y.Z` and a Docker tag `version-X.Y.Z`. Confirm
the Docker tag exists before pinning it — a release can precede its image by minutes:

```bash
curl -s "https://hub.docker.com/v2/repositories/fireflyiii/core/tags?page_size=10" \
  | jq -r '.results[].name'
docker manifest inspect fireflyiii/core:version-X.Y.Z \
  | jq -r '.manifests[].platform | "\(.os)/\(.architecture)"'
```

The manifest must list both `amd64` and `arm64`.

## Applying the bump

1. Set `images.firefly.source.dockerTag` (and/or `images.data-importer.source.dockerTag`)
   in `startos/manifest/index.ts`.
2. Set `version` in `startos/versions/current.ts` to `<firefly-version>:<revision>`, and
   write release notes in all five locales.
3. Read upstream's release notes for a manual upgrade step. Firefly III migrates its own
   schema on start, but major releases occasionally document a one-off command; if one
   appears, it belongs in the package rather than in a user instruction.
