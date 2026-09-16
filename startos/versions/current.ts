import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.2:0',
  releaseNotes: {
    en_US:
      'Updated Firefly III to 6.7.2. Fixes transaction cloning, keeps dashboard values hidden when requested, and restores fiscal-year settings, transaction tags and categories, and custom date ranges. Also adds a Configure Enable Banking action, which stores the credentials the Data Importer needs to connect to your banks through Enable Banking, and turns Firefly III’s own check for updates off — updates arrive through StartOS. [Full upstream release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    es_ES:
      'Firefly III se actualizó a la versión 6.7.2. Corrige la clonación de transacciones, mantiene ocultos los valores del panel cuando se solicita y restablece la configuración del año fiscal, las etiquetas y categorías de transacciones y los intervalos de fechas personalizados. También añade la acción Configurar Enable Banking, que guarda las credenciales que el importador de datos necesita para conectarse a tus bancos a través de Enable Banking, y desactiva la comprobación de actualizaciones propia de Firefly III: las actualizaciones llegan a través de StartOS. [Notas completas de la versión original](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    de_DE:
      'Firefly III wurde auf Version 6.7.2 aktualisiert. Die Aktualisierung korrigiert das Kopieren von Buchungen, hält Dashboard-Werte auf Wunsch ausgeblendet und stellt die Geschäftsjahreseinstellung, Buchungstags und -kategorien sowie benutzerdefinierte Datumsbereiche wieder her. Außerdem gibt es die neue Aktion „Enable Banking einrichten“, die die Zugangsdaten speichert, mit denen der Datenimporter über Enable Banking auf Ihre Banken zugreift, und Firefly IIIs eigene Update-Prüfung ist abgeschaltet – Updates kommen über StartOS. [Vollständige Versionshinweise des Originalprojekts](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    pl_PL:
      'Zaktualizowano Firefly III do wersji 6.7.2. Poprawiono klonowanie transakcji, zachowanie ukrytych wartości na pulpicie oraz ustawienie roku obrachunkowego, tagi i kategorie transakcji i niestandardowe zakresy dat. Dodano też akcję Skonfiguruj Enable Banking, która zapisuje dane potrzebne importerowi danych do łączenia się z Twoimi bankami przez Enable Banking, oraz wyłączono własne sprawdzanie aktualizacji Firefly III — aktualizacje przychodzą przez StartOS. [Pełne informacje o wydaniu projektu bazowego](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
    fr_FR:
      'Firefly III a été mis à jour vers la version 6.7.2. Cette mise à jour corrige le clonage des transactions, maintient les valeurs du tableau de bord masquées à la demande et rétablit le réglage de l’année fiscale, les étiquettes et catégories des transactions ainsi que les plages de dates personnalisées. Elle ajoute aussi l’action Configurer Enable Banking, qui enregistre les identifiants dont l’importateur de données a besoin pour se connecter à vos banques via Enable Banking, et désactive la vérification des mises à jour propre à Firefly III : les mises à jour arrivent par StartOS. [Notes de version complètes du projet d’origine](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.2)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
