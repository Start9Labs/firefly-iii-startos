import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.5:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.5. Fixes an MFA bypass and issues with account reconciliation, attachments and transaction editing. [Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.5)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.5. Corrige una vulnerabilidad que permitía eludir la autenticación multifactor y problemas al conciliar cuentas, gestionar archivos adjuntos y editar transacciones. [Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.5)',
    de_DE:
      'Firefly III wurde auf Version 6.7.5 aktualisiert. Behoben wurden eine Umgehung der Mehrfaktor-Authentifizierung sowie Fehler bei der Kontenabstimmung, bei Anhängen und beim Bearbeiten von Buchungen. [Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.5)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.5. Naprawiono możliwość obejścia uwierzytelniania wieloskładnikowego oraz problemy z uzgadnianiem kont, załącznikami i edycją transakcji. [Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.5)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.5. Cette version corrige un contournement de l’authentification multifacteur ainsi que des problèmes de rapprochement des comptes, de pièces jointes et de modification des transactions. [Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.5)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
