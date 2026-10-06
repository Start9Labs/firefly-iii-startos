import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.7:1',
  releaseNotes: {
    en_US: `Updated Firefly III to 6.7.7. Fixes transaction creation, strict rules, currency balances, time-zone handling and Data Importer access. [Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7)

- Open UI opens Firefly III at its primary URL.
- Reissue Data Importer Token asks for confirmation before running.
- Configure Enable Banking accepts a pasted private key file.`,
    es_ES: `Firefly III se actualizó a la versión 6.7.7. Corrige la creación de transacciones, las reglas estrictas, los saldos en distintas monedas, la gestión de zonas horarias y el acceso al importador de datos. [Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7)

- Abrir interfaz abre Firefly III en su URL principal.
- Reemitir el token del importador de datos pide confirmación antes de ejecutarse.
- Configurar Enable Banking acepta el archivo de clave privada pegado.`,
    de_DE: `Firefly III wurde auf Version 6.7.7 aktualisiert. Behebt Fehler bei der Transaktionserstellung, strikten Regeln, Währungssalden, der Zeitzonenverarbeitung und dem Zugriff auf den Datenimporter. [Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7)

- „Oberfläche öffnen“ öffnet Firefly III unter seiner primären URL.
- „Datenimporter-Token neu ausstellen“ fragt vor der Ausführung nach einer Bestätigung.
- „Enable Banking einrichten“ akzeptiert eine eingefügte Datei mit dem privaten Schlüssel.`,
    pl_PL: `Zaktualizowano Firefly III do wersji 6.7.7. Naprawiono tworzenie transakcji, ścisłe reguły, salda walutowe, obsługę stref czasowych i dostęp do importera danych. [Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7)

- „Otwórz interfejs” otwiera Firefly III pod jego głównym adresem URL.
- „Wydaj nowy token importera danych” prosi o potwierdzenie przed uruchomieniem.
- „Skonfiguruj Enable Banking” przyjmuje wklejony plik klucza prywatnego.`,
    fr_FR: `Firefly III a été mis à jour vers la version 6.7.7. Corrige la création de transactions, les règles strictes, les soldes en devises, la gestion des fuseaux horaires et l’accès à l’importateur de données. [Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7)

- Ouvrir l'interface ouvre Firefly III sur son URL principale.
- Réémettre le jeton de l'importateur de données demande une confirmation avant de s'exécuter.
- Configurer Enable Banking accepte le fichier de clé privée collé.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
