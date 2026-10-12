import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.9:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.9. Fixes transaction editing during account reconciliation, category menus, missing account totals and empty budget columns. Updated start-sdk to 3.0.6. [Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.9)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.9. Corrige la edición de transacciones durante la conciliación de cuentas, los menús de categorías, los totales de cuentas ausentes y las columnas de presupuesto vacías. Se actualizó start-sdk a 3.0.6. [Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.9)',
    de_DE:
      'Firefly III wurde auf Version 6.7.9 aktualisiert. Behebt Fehler beim Bearbeiten von Buchungen während des Kontenabgleichs, in Kategorienmenüs sowie bei fehlenden Kontensummen und leeren Budgetspalten. start-sdk wurde auf 3.0.6 aktualisiert. [Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.9)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.9. Naprawiono edycję transakcji podczas uzgadniania kont, menu kategorii, brakujące sumy kont i puste kolumny budżetu. Zaktualizowano start-sdk do wersji 3.0.6. [Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.9)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.9. Corrige la modification des transactions lors du rapprochement des comptes, les menus des catégories, les totaux de comptes manquants et les colonnes de budget vides. start-sdk a été mis à jour vers la version 3.0.6. [Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.9)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
