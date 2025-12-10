# Analisi Progetto Plus-Onlus - Web App Gestionale

## Documento di Riferimento per il Rifacimento del Progetto

---

## 1. Contesto: Chi è Plus APS

**Plus APS** (ex Onlus) è la **prima organizzazione italiana di persone LGBT+ sieropositive**. L'associazione opera con la convinzione che "l'HIV non si sconfigge solo con i farmaci", combinando ricerca scientifica e advocacy sociale per ridurre lo stigma e migliorare gli outcome sanitari.

### Servizi Offerti dall'Associazione

| Servizio | Descrizione |
|----------|-------------|
| **PrEP Point** | Servizio community-based per la prevenzione HIV con PrEP, counseling e test IST |
| **BLQ Checkpoint** | Servizio di testing e screening sanitario |
| **TelePrEP** | Accesso remoto a consulenze PrEP (in collaborazione con altre organizzazioni) |
| **Contenuti Educativi** | Articoli, ricerche e informazioni su prevenzione e gestione HIV |

### Target di Riferimento
- MSM (Men who have Sex with Men)
- Persone transgender ad alto rischio di infezione HIV
- Comunità LGBT+ sieropositiva

### Obiettivo Principale
Ridurre le diagnosi tardive (attualmente al 60% in Emilia-Romagna) e colmare le lacune nell'accesso sanitario per le popolazioni marginalizzate.

---

## 2. Panoramica del Sistema Attuale

### Tipologia
Web application per la gestione sanitaria online delle prestazioni di Plus, che fornisce:
- Gestione anagrafe pazienti/utenti
- Sistema di questionari compilabili online
- Prenotazione e gestione visite mediche
- Tracciamento test diagnostici e vaccinazioni
- Gestione counseling e incontri
- Gestione dati personali e privacy

### Stack Tecnologico Attuale

| Componente | Tecnologia | Versione |
|------------|------------|----------|
| **Backend Framework** | CakePHP | 3.6.x |
| **Linguaggio Backend** | PHP | 7.4.33 |
| **Frontend Framework** | React | 16.13.1 |
| **Build Tool** | Webpack | 5 |
| **Database** | MySQL | - |
| **Stylesheet** | SCSS/SASS | - |
| **Transpiler** | Babel | ES6 |

---

## 3. Architettura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER CLIENT                           │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  React Components (JSX)                               │ │
│  │  - Compilazione Questionari                           │ │
│  │  - Multi-lingua (IT, EN, ES, PT)                      │ │
│  │  - API Calls via lib/model.js                         │ │
│  └───────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/JSON
┌────────────────────────────▼────────────────────────────────┐
│                 CAKEPHP APPLICATION                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Controllers   │  │     Models      │  │   Views     │ │
│  │  - Questionnaires│  │  - ORM Tables   │  │  - CTP      │ │
│  │  - CheckAnagrafe │  │  - Entities     │  │  - Layouts  │ │
│  │  - Users        │  │  - Behaviors    │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ SQL
┌────────────────────────────▼────────────────────────────────┐
│                     MYSQL DATABASE                          │
│               40+ tabelle relazionali                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Funzionalità Principali

### 4.1 Gestione Utenti e Autenticazione

#### Ruoli Utente

| Ruolo | Descrizione | Permessi |
|-------|-------------|----------|
| **Amministratore** | Gestione completa del sistema | Gestione users, questionari, reports, accesso completo |
| **Utente** | Operatore standard | Ricerca pazienti, compilazione dati, visualizzazione |
| **CounselorPlus** | Counselor con permessi estesi | Come Utente + conferma questionari compilati |

#### Funzionalità Login
- Autenticazione username/password
- Verifica stato utente (enabled/disabled)
- Redirect automatico post-login a ricerca pazienti
- Logout con redirect a pagina login

### 4.2 Gestione Anagrafe Pazienti (CheckAnagrafe)

#### Codice Identificativo Paziente
Formato univoco: `[2 lettere cognome]-[2 lettere nome]-[GG/MM/AAAA]-[M/F/T]`

**Esempio:** `RO-MA-01/05/1990-M` (Rossi Mario, 1 maggio 1990, Maschio)

Questo codice garantisce:
- Anonimizzazione del paziente
- Identificazione univoca
- Estrazione automatica di: data nascita, genere

#### Funzionalità Anagrafe

| Funzione | Descrizione |
|----------|-------------|
| **Ricerca** | Ricerca paziente per codice con statistiche (persone totali, incontri, filtro anno) |
| **Creazione** | Nuovo paziente con validazione codice e dati anagrafici |
| **Tab Visita** | Vista completa paziente con test, vaccini, osservazioni, questionari |
| **Info Generali** | Dati personali e anagrafici |
| **Privacy** | Consensi privacy, contatti, opt-in SMS |
| **Profilassi** | Gestione vaccinazioni |
| **Storia IST** | Cronologia infezioni sessualmente trasmissibili |
| **Questionari** | Visualizzazione risultati questionari compilati |

#### Dati Gestiti per Paziente
- Dati anagrafici (nome, cognome, nascita, residenza, contatti)
- Consensi privacy
- Test diagnostici eseguiti
- Vaccinazioni
- Osservazioni cliniche
- Informazioni aggiuntive
- Cronologia incontri con counselor
- Appuntamenti futuri
- File allegati (anamnesi, documenti)

### 4.3 Gestione Visite e Incontri

#### Tracciamento Incontri
- Ogni interazione counselor-paziente viene registrata
- Timestamp automatico
- Associazione counselor responsabile
- Storico completo consultabile

#### Prenotazione Appuntamenti
- Selezione data/ora visita futura
- Visualizzazione nel tab paziente
- Modifica/cancellazione prenotazioni
- Notifiche (se SMS abilitato)

### 4.4 Gestione Test Diagnostici

#### Funzionalità
- Registrazione test eseguiti
- Associazione infermiere/operatore
- Risultato test (positivo/negativo/indeterminato)
- Note aggiuntive
- Flag richiamo (follow-up)
- Link ad altri record (LinkedCare)

#### Catalogo Test
Tabella configurabile con:
- Nome test
- Tipo test
- Visibilità (attivo/nascosto)

### 4.5 Gestione Vaccinazioni

#### Funzionalità
- Registrazione vaccinazioni somministrate
- Data somministrazione
- Tipo vaccino (da catalogo)
- Storico completo

#### Catalogo Vaccini
Tabella configurabile con:
- Nome vaccino
- Visibilità (attivo/nascosto)

### 4.6 Sistema Questionari

#### Caratteristiche Principali
- **Pubblicamente accessibili** (non richiede login CakePHP)
- **Multi-lingua** (Italiano, Inglese, Spagnolo, Portoghese)
- **Autenticazione via codice paziente**
- **Domande condizionali** (dipendenze tra risposte)
- **Revisione pre-conferma** da parte del counselor

#### Tipi di Domande Supportati

| Tipo | Descrizione | Widget UI |
|------|-------------|-----------|
| 1 | Scelta multipla | Radio button / Checkbox |
| 2 | Testo breve | Text input |
| 3 | Testo lungo | Textarea |
| 4 | Numero | Number input |
| 5 | Data | Date picker |

#### Tipi di Risposte

| Tipo | Descrizione | Validazione |
|------|-------------|-------------|
| 1 | Standard | Nessuna |
| 2 | Input testo | Min 3 caratteri se compilato |
| 3 | Input data | Formato data |
| 4 | Data custom | Formato personalizzato |

#### Flusso Compilazione Questionario

```
1. Utente accede a /questionario
2. Seleziona questionario dalla lista
3. Inserisce codice identificativo (es: RO-MA-01/05/1990-M)
4. Sistema verifica esistenza codice in anagrafe
5. Seleziona lingua preferita
6. Compila le domande (con validazione real-time)
7. Revisiona le risposte
8. Conferma e salva
9. Risultato salvato come "in sospeso" (confirmed: 0)
10. Counselor accede ai dati e conferma (confirmed: 1)
```

#### Gestione Questionari (Admin)
- Creazione nuovo questionario
- Definizione domande e risposte
- Configurazione sezioni e categorie
- Impostazione dipendenze condizionali
- Abilitazione/disabilitazione
- Configurazione finestra temporale (start/end)
- Export risultati (CSV, Excel, etc.)

### 4.7 Reporting e Export

#### Report Disponibili
- Statistiche pazienti per periodo
- Conteggio incontri
- Risultati questionari aggregati
- Export dati in vari formati

#### Formati Export
- CSV
- Excel
- PDF (per alcuni report)

---

## 5. Modello Dati

### 5.1 Entità Principali

#### users (Utenti Sistema)
```
- id: INT (PK)
- username: VARCHAR
- password: VARCHAR (hash)
- Nome: VARCHAR
- Cognome: VARCHAR
- Città: VARCHAR
- role: ENUM ('Amministratore', 'Utente', 'CounselorPlus')
- enabled: BOOLEAN
```

#### check_anagrafe (Pazienti)
```
- id: INT (PK)
- Codice: VARCHAR (formato: XX-XX-GG/MM/AAAA-X)
- Nome: VARCHAR
- Cognome: VARCHAR
- DataNascita: DATE
- Genere: CHAR(1) (M/F/T)
- LuogoNascita: VARCHAR
- CittaDomicilio: VARCHAR
- Telefono1: VARCHAR
- Telefono2: VARCHAR
- email: VARCHAR
- Privacy: BOOLEAN
- sms: BOOLEAN
- Richiamo: BOOLEAN
- Utente: INT (FK -> users.id, creatore)
- motivazioneRitiro: TEXT
- dataRitiro: DATE
```

#### check_incontri (Incontri)
```
- id: INT (PK)
- IDUtente: INT (FK -> check_anagrafe.id)
- IDCounselor: INT (FK -> users.id)
- DataIncontro: DATETIME
```

#### check_appuntamenti (Prenotazioni)
```
- id: INT (PK)
- ID_old: INT (FK -> check_anagrafe.id)
- Data: DATE
- date: DATETIME
```

#### check_test (Test Diagnostici)
```
- id: INT (PK)
- ID_old: INT (FK -> check_anagrafe.id)
- Data: DATE
- IDTest: INT (FK -> tabtest.id)
- IDInfermiere: INT (FK -> tabinfermieri.id)
- IDEsito: INT
- TEXTEsito: TEXT
- Richiamo: BOOLEAN
- LinkCare: INT
- Linked: BOOLEAN
```

#### check_vaccini (Vaccinazioni)
```
- id: INT (PK)
- ID_old: INT (FK -> check_anagrafe.id)
- Data: DATE
- IDVaccino: INT (FK -> tabvaccini.id)
```

### 5.2 Entità Questionari

#### questionnaires
```
- id: INT (PK)
- name: VARCHAR
- description: TEXT
- enabled: BOOLEAN
- anonymous: BOOLEAN
- start_time: DATETIME
- end_time: DATETIME
- default_language_id: INT
```

#### questionnaires__questions
```
- id: INT (PK)
- type: INT (1-5)
- rank: INT (ordinamento)
- mandatory: BOOLEAN
- cardinality: INT
- recurring: BOOLEAN
- answerMin: INT
- answerMax: INT
- section: INT
- category: INT
- question_text: TEXT
```

#### questionnaires__answers
```
- id: INT (PK)
- question_id: INT (FK)
- type: INT (1-4)
- rank: INT
```

#### questionnaires__results
```
- id: INT (PK)
- user: VARCHAR (codice paziente)
- questionnaire_id: INT (FK)
- timestamp: DATETIME
- questionnaire_data: TEXT (JSON base64)
- confirmed: BOOLEAN
- confirmed_by: INT (FK -> users.id)
- city: VARCHAR
- examination: INT (contatore compilazioni)
```

#### questionnaires__questions_dependencies
```
- id: INT (PK)
- question_id: INT (FK)
- depends_on_answer_id: INT (FK)
```

### 5.3 Tabelle di Lookup

| Tabella | Descrizione |
|---------|-------------|
| tabtest | Catalogo test diagnostici |
| tabvaccini | Catalogo vaccini |
| tabinfermieri | Elenco operatori/infermieri |
| tabcitta | Città |
| taborienta | Orientamenti |
| tabfrequenza | Frequenza visite |
| tabperiodorichiami | Periodi di richiamo |

---

## 6. API Endpoints

### Autenticazione
```
POST /users/login          # Login utente
GET  /users/logout         # Logout
```

### Anagrafe
```
GET  /check-anagrafe/search        # Ricerca pazienti
POST /check-anagrafe/add           # Nuovo paziente
GET  /check-anagrafe/tab/:id       # Vista completa
GET  /check-anagrafe/generalinfo/:id
GET  /check-anagrafe/privacy/:id
GET  /check-anagrafe/prophylaxis/:id
GET  /check-anagrafe/storiaist/:id
GET  /check-anagrafe/questionnaires/:id
```

### Questionari (Pubblici)
```
GET  /questionario                           # Lista questionari
GET  /questionario/:id                       # Pagina compilazione
GET  /user-code/:code/                       # Verifica codice esistente
GET  /questionnaire-data/:id/:lang/          # Dati questionario per lingua
POST /questionnaire-results-save             # Salva risultato
POST /questionnaire-results-update           # Aggiorna/conferma risultato
GET  /results-data/code/:code/:id            # Risultati per codice
GET  /results-data/id/:id                    # Risultato specifico
```

### Gestione Questionari (Admin)
```
GET  /questionnaire-manager                  # Lista
POST /questionnaire-manager/add              # Nuovo
GET  /questionnaire-manager/edit/:id         # Modifica
GET  /questionnaire-manager/questions/:id    # Gestione domande
POST /questionnaire-manager/add-question/:id # Aggiungi domanda
```

### Export/Report
```
GET /reports/:output/:report/:from/:to
GET /download/questionnaires/:output/:format/:lang/:id/:from/:to
```

---

## 7. Struttura Cartelle Progetto Attuale

```
Plus-Onlus/
├── config/
│   ├── routes.php                 # Definizione rotte
│   ├── bootstrap.php              # Bootstrap applicazione
│   ├── app.default.php            # Configurazione
│   ├── migrations/                # Migrazioni database
│   └── Seeds/                     # Seed dati iniziali
├── src/
│   ├── Controller/                # 18 controller CakePHP
│   ├── Model/
│   │   ├── Table/                 # 44 modelli tabella
│   │   ├── Entity/                # Entità
│   │   └── Behavior/              # Behavior personalizzati
│   ├── Template/                  # View CakePHP (.ctp)
│   ├── React/                     # Componenti React
│   │   ├── compile/               # App compilazione questionari
│   │   ├── lib/                   # Utility e API
│   │   └── lang/                  # Traduzioni
│   └── Locale/                    # Traduzioni CakePHP
├── webroot/                       # Root pubblico
│   ├── js/build/                  # Output Webpack
│   ├── css/
│   └── usersdata/                 # Upload file utenti
├── tests/                         # Unit tests
├── package.json                   # Dipendenze Node.js
├── composer.json                  # Dipendenze PHP
└── webpack.config.js              # Build configuration
```

---

## 8. Considerazioni per il Rifacimento

### 8.1 Punti di Forza da Mantenere

1. **Codice Identificativo Paziente**: Il sistema di codifica anonimizzato è efficace e va mantenuto
2. **Sistema Questionari Flessibile**: Supporto multi-lingua e domande condizionali
3. **Separazione Ruoli**: Distinzione chiara tra admin, operatori e counselor
4. **Workflow Conferma**: Doppio step (compilazione + conferma counselor)

### 8.2 Criticità da Risolvere

1. **Stack Tecnologico Datato**: CakePHP 3.6 e React 16 sono versioni obsolete
2. **Architettura Mista**: Mix di rendering server-side (CakePHP views) e client-side (React)
3. **Naming Convention Inconsistente**: Mix italiano/inglese nei nomi di tabelle e campi
4. **Codice Legacy**: Presenza di campi come `ID_old` che suggeriscono migrazioni passate
5. **Documentazione**: Assente documentazione tecnica

### 8.3 Funzionalità Core da Implementare

#### Priorità Alta
- [ ] Gestione anagrafe pazienti con codice univoco
- [ ] Sistema questionari multi-lingua con dipendenze
- [ ] Autenticazione e autorizzazione basata su ruoli
- [ ] Registrazione incontri counselor-paziente
- [ ] Gestione test diagnostici
- [ ] Gestione vaccinazioni
- [ ] Prenotazione appuntamenti

#### Priorità Media
- [ ] Export dati e reporting
- [ ] Gestione consensi privacy
- [ ] Upload documenti
- [ ] Notifiche SMS
- [ ] Gestione richiami (follow-up)

#### Priorità Bassa
- [ ] Storico IST
- [ ] Statistiche aggregate
- [ ] Questionario medico dettagliato (storia sessuale, uso sostanze)

### 8.4 Suggerimenti Tecnici per il Nuovo Sistema

1. **Framework Moderno**: Considerare Next.js, Laravel, o Django per una base più moderna
2. **API-First**: Separazione completa frontend/backend con API REST o GraphQL
3. **Database**: Riprogettare lo schema con naming convention consistente (inglese)
4. **Autenticazione**: Implementare JWT o OAuth2
5. **Validazione**: Unificare validazione frontend e backend
6. **Testing**: Coverage completo con test automatizzati
7. **CI/CD**: Pipeline di deployment automatizzato
8. **Documentazione**: API documentation (OpenAPI/Swagger)

---

## 9. Glossario

| Termine | Descrizione |
|---------|-------------|
| **Paziente/Utente** | Persona che usufruisce dei servizi Plus |
| **Counselor** | Operatore che gestisce gli incontri con i pazienti |
| **Codice** | Identificativo univoco anonimizzato del paziente |
| **Incontro** | Sessione tra counselor e paziente |
| **IST** | Infezioni Sessualmente Trasmissibili |
| **PrEP** | Profilassi Pre-Esposizione (farmaco preventivo HIV) |
| **Checkpoint** | Punto di testing e screening |

---

## 10. Riferimenti

- Sito Associazione: https://www.plus-aps.it/
- Servizio PrEP Point: https://www.plus-aps.it/preppoint/
- BLQ Checkpoint: https://www.plus-aps.it/blq/

---

*Documento generato per il rifacimento del progetto Plus-Onlus Web App*
*Data: Dicembre 2025*
