import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.2:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.2. Fixes transaction cloning, keeps dashboard values hidden when requested, and restores fiscal-year settings, transaction tags and categories, and custom date ranges. [Full upstream release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.2. Corrige la clonación de transacciones, mantiene ocultos los valores del panel cuando se solicita y restablece la configuración del año fiscal, las etiquetas y categorías de transacciones y los intervalos de fechas personalizados. [Notas completas de la versión original](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    de_DE:
      'Firefly III wurde auf Version 6.7.2 aktualisiert. Die Aktualisierung korrigiert das Kopieren von Buchungen, hält Dashboard-Werte auf Wunsch ausgeblendet und stellt die Geschäftsjahreseinstellung, Buchungstags und -kategorien sowie benutzerdefinierte Datumsbereiche wieder her. [Vollständige Versionshinweise des Originalprojekts](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.2. Poprawiono klonowanie transakcji, zachowanie ukrytych wartości na pulpicie oraz ustawienie roku obrachunkowego, tagi i kategorie transakcji i niestandardowe zakresy dat. [Pełne informacje o wydaniu projektu bazowego](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.2. Cette mise à jour corrige le clonage des transactions, maintient les valeurs du tableau de bord masquées à la demande et rétablit le réglage de l’année fiscale, les étiquettes et catégories des transactions ainsi que les plages de dates personnalisées. [Notes de version complètes du projet d’origine](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
