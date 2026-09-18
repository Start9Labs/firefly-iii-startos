import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.3:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.3. Fixes date-range selection, transaction cloning and mass editing, account attachment errors, reports that included disabled accounts, and the mobile budget chart. [Full upstream release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.3. Corrige la selección de intervalos de fechas, la clonación y edición masiva de transacciones, los errores con archivos adjuntos de cuentas, los informes que incluían cuentas deshabilitadas y el gráfico de presupuesto para móviles. [Notas completas de la versión original](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3)',
    de_DE:
      'Firefly III wurde auf Version 6.7.3 aktualisiert. Die Aktualisierung korrigiert die Auswahl von Datumsbereichen, das Kopieren und die Massenbearbeitung von Buchungen, Fehler bei Konten mit Anhängen, Berichte mit deaktivierten Konten und das Budgetdiagramm auf Mobilgeräten. [Vollständige Versionshinweise des Originalprojekts](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.3. Poprawiono wybór zakresu dat, klonowanie i zbiorczą edycję transakcji, błędy załączników kont, raporty uwzględniające wyłączone konta oraz wykres budżetu na urządzeniach mobilnych. [Pełne informacje o wydaniu projektu bazowego](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.3. Cette mise à jour corrige la sélection des plages de dates, le clonage et la modification groupée des transactions, les erreurs liées aux pièces jointes des comptes, les rapports incluant des comptes désactivés et le graphique du budget sur mobile. [Notes de version complètes du projet d’origine](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
