import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.12:0',
  releaseNotes: {
    en_US: `Updated Firefly III to 6.7.12.

- New: a dashboard Sankey chart, a rule action that changes a transaction's date, inline editing of account names, and groupable accounts and categories
- Fix: a failed update of a multi-part transaction no longer deletes the whole transaction
- Fix: recurring transactions can be created again, and many other fixes
- Security: closes several issues, including admin preferences that could be submitted before the two-factor check

[Full release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.12)`,
    es_ES: `Firefly III actualizado a 6.7.12.

- Nuevo: un gráfico Sankey en el panel, una acción de regla que cambia la fecha de una transacción, edición en línea de los nombres de cuenta, y cuentas y categorías agrupables
- Corrección: una actualización fallida de una transacción de varias partes ya no elimina la transacción completa
- Corrección: vuelve a ser posible crear transacciones recurrentes, y muchas otras correcciones
- Seguridad: corrige varios problemas, entre ellos preferencias de administración que podían enviarse antes de la verificación en dos pasos

[Notas completas de la versión](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.12)`,
    de_DE: `Firefly III auf 6.7.12 aktualisiert.

- Neu: ein Sankey-Diagramm im Dashboard, eine Regelaktion, die das Datum einer Buchung ändert, Inline-Bearbeitung von Kontonamen sowie gruppierbare Konten und Kategorien
- Behoben: Eine fehlgeschlagene Aktualisierung einer mehrteiligen Buchung löscht nicht mehr die gesamte Buchung
- Behoben: Wiederkehrende Buchungen lassen sich wieder anlegen, dazu viele weitere Korrekturen
- Sicherheit: behebt mehrere Probleme, darunter Admin-Einstellungen, die vor der Zwei-Faktor-Prüfung gespeichert werden konnten

[Vollständige Versionshinweise](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.12)`,
    pl_PL: `Zaktualizowano Firefly III do wersji 6.7.12.

- Nowość: wykres Sankeya na pulpicie, akcja reguły zmieniająca datę transakcji, edycja nazw kont w miejscu oraz grupowanie kont i kategorii
- Poprawka: nieudana aktualizacja transakcji wieloczęściowej nie usuwa już całej transakcji
- Poprawka: ponownie można tworzyć transakcje cykliczne, oraz wiele innych poprawek
- Bezpieczeństwo: usuwa kilka problemów, w tym możliwość zapisania preferencji administratora przed weryfikacją dwuetapową

[Pełne informacje o wydaniu](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.12)`,
    fr_FR: `Mise à jour de Firefly III vers 6.7.12.

- Nouveau : un diagramme de Sankey sur le tableau de bord, une action de règle qui modifie la date d'une transaction, la modification directe des noms de compte, et des comptes et catégories regroupables
- Correctif : l'échec de la mise à jour d'une transaction en plusieurs parties ne supprime plus toute la transaction
- Correctif : les transactions récurrentes peuvent de nouveau être créées, et de nombreux autres correctifs
- Sécurité : corrige plusieurs problèmes, dont des préférences d'administration qui pouvaient être enregistrées avant la vérification en deux étapes

[Notes de version complètes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.12)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
