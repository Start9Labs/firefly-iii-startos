import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.7.1:0',
  releaseNotes: {
    en_US: `Updated Firefly III to 6.7.1.

**Highlights**

- New application layout and transaction forms, plus a view of all transactions
- Security hardening for two-factor authentication, preferences, rule actions, searches, and other sensitive flows
- Fixes for accounts, subscriptions, rules, recurring transactions, search, transaction cloning, and reconciliation
- The rule expression engine is disabled by default after updating; enable it again in Settings if needed

[Full upstream release notes](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.1)`,
    es_ES: `Firefly III se actualizó a la versión 6.7.1.

**Aspectos destacados**

- Nuevo diseño de la aplicación y nuevos formularios de transacciones, además de una vista de todas las transacciones
- Mejoras de seguridad para la autenticación de dos factores, las preferencias, las acciones de reglas, las búsquedas y otros procesos sensibles
- Correcciones para cuentas, suscripciones, reglas, transacciones periódicas, búsquedas, clonación de transacciones y conciliación
- El motor de expresiones de las reglas queda desactivado de forma predeterminada tras la actualización; actívelo de nuevo en Configuración si lo necesita

[Notas completas de la versión original](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.1)`,
    de_DE: `Firefly III wurde auf Version 6.7.1 aktualisiert.

**Höhepunkte**

- Neues Anwendungslayout und neue Buchungsformulare sowie eine Ansicht aller Buchungen
- Verbesserte Sicherheit für Zwei-Faktor-Authentifizierung, Einstellungen, Regelaktionen, Suchen und weitere sensible Abläufe
- Korrekturen für Konten, Abonnements, Regeln, wiederkehrende Buchungen, Suche, das Kopieren von Buchungen und den Kontenabgleich
- Die Ausdrucks-Engine für Regeln ist nach dem Update standardmäßig deaktiviert; aktivieren Sie sie bei Bedarf unter Einstellungen erneut

[Vollständige Versionshinweise des Originalprojekts](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.1)`,
    pl_PL: `Zaktualizowano Firefly III do wersji 6.7.1.

**Najważniejsze zmiany**

- Nowy układ aplikacji i formularze transakcji oraz widok wszystkich transakcji
- Ulepszenia zabezpieczeń uwierzytelniania dwuskładnikowego, preferencji, działań reguł, wyszukiwania i innych poufnych procesów
- Poprawki dotyczące kont, subskrypcji, reguł, transakcji cyklicznych, wyszukiwania, klonowania transakcji i uzgadniania
- Silnik wyrażeń reguł jest domyślnie wyłączony po aktualizacji; w razie potrzeby włącz go ponownie w Ustawieniach

[Pełne informacje o wydaniu projektu bazowego](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.1)`,
    fr_FR: `Firefly III a été mis à jour vers la version 6.7.1.

**Points forts**

- Nouvelle présentation de l’application et nouveaux formulaires de transaction, ainsi qu’une vue de toutes les transactions
- Renforcement de la sécurité pour l’authentification à deux facteurs, les préférences, les actions de règles, les recherches et d’autres opérations sensibles
- Correctifs pour les comptes, les abonnements, les règles, les transactions récurrentes, la recherche, le clonage de transactions et le rapprochement
- Le moteur d’expressions des règles est désactivé par défaut après la mise à jour ; réactivez-le dans les Paramètres si nécessaire

[Notes de version complètes du projet d’origine](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.1)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
