import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.8:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.8. Adds category colors, sorting and filtering; fixes reports, exchange rates, recurring transactions and reverse-proxy access, and prevents static access tokens from being logged in full. Updated start-sdk to 3.0.4. [Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.8)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.8. Añade colores, ordenación y filtros para las categorías; corrige informes, tipos de cambio, transacciones periódicas y acceso mediante proxy inverso, y evita registrar tokens de acceso estáticos completos. Se actualizó start-sdk a 3.0.4. [Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.8)',
    de_DE:
      'Firefly III wurde auf Version 6.7.8 aktualisiert. Fügt Kategorienfarben, Sortierung und Filter hinzu; behebt Fehler in Berichten, Wechselkursen, wiederkehrenden Buchungen und beim Zugriff über Reverse-Proxys und verhindert die vollständige Protokollierung statischer Zugriffstoken. start-sdk wurde auf 3.0.4 aktualisiert. [Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.8)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.8. Dodano kolory, sortowanie i filtrowanie kategorii; naprawiono raporty, kursy walut, transakcje cykliczne i dostęp przez odwrotne proxy oraz wyeliminowano zapisywanie pełnych statycznych tokenów dostępu w logach. Zaktualizowano start-sdk do wersji 3.0.4. [Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.8)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.8. Ajoute les couleurs, le tri et le filtrage des catégories ; corrige les rapports, les taux de change, les transactions récurrentes et l’accès par proxy inverse, et empêche la journalisation intégrale des jetons d’accès statiques. start-sdk a été mis à jour vers la version 3.0.4. [Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.8)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
