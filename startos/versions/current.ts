import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.6:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.6. Fixes broken OAuth redirects. [Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.6)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.6. Corrige los fallos en las redirecciones de OAuth. [Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.6)',
    de_DE:
      'Firefly III wurde auf Version 6.7.6 aktualisiert. Fehlerhafte OAuth-Weiterleitungen wurden behoben. [Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.6)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.6. Naprawiono przekierowania OAuth. [Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.6)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.6. Cette version corrige les redirections OAuth défectueuses. [Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.6)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
