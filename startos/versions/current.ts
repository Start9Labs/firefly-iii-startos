import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.4:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.4 and the Data Importer. Fixes transaction creation, running balances, date selection and PDF reports; the importer fixes bank downloads and Enable Banking with no key configured. [Firefly III release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.4) · [Data Importer release notes](https://github.com/firefly-iii/data-importer/releases/tag/v2.3.5)',
    es_ES:
      'Se actualizaron Firefly III a la versión 6.7.4 y el importador de datos. Se corrigen la creación de transacciones, los saldos acumulados, la selección de fechas y los informes PDF; el importador corrige las descargas bancarias y Enable Banking cuando no hay clave configurada. [Notas de Firefly III](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.4) · [Notas del importador](https://github.com/firefly-iii/data-importer/releases/tag/v2.3.5)',
    de_DE:
      'Firefly III wurde auf Version 6.7.4 aktualisiert, ebenso der Datenimporter. Korrigiert wurden das Erstellen von Buchungen, laufende Salden, die Datumsauswahl und PDF-Berichte; der Importer behebt Fehler bei Bankabrufen und bei Enable Banking ohne konfigurierten Schlüssel. [Firefly III – Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.4) · [Importer – Versionshinweise](https://github.com/firefly-iii/data-importer/releases/tag/v2.3.5)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.4 oraz importer danych. Poprawiono tworzenie transakcji, salda bieżące, wybór dat i raporty PDF; importer naprawia pobieranie danych z banków oraz działanie Enable Banking bez skonfigurowanego klucza. [Informacje o wydaniu Firefly III](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.4) · [Informacje o wydaniu importera](https://github.com/firefly-iii/data-importer/releases/tag/v2.3.5)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.4, ainsi que l’importateur de données. Cette mise à jour corrige la création des transactions, les soldes cumulés, le choix des dates et les rapports PDF ; l’importateur corrige les téléchargements bancaires et Enable Banking sans clé configurée. [Notes de Firefly III](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.4) · [Notes de l’importateur](https://github.com/firefly-iii/data-importer/releases/tag/v2.3.5)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
