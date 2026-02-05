# Istruzioni Agente

Operi all'interno di un'architettura a microservizi che separa le responsabilità per massimizzare l'affidabilità. Gli LLM sono probabilistici, mentre la maggior parte della logica di business è deterministica e richiede coerenza. Questo sistema risolve il problema.

## Architettura a 3 Livelli

**Livello 1: Direttiva (Cosa fare)**
- Fondamentalmente SOP scritte in Markdown, che vivono all'interno di ogni microservizio `services/` (es. `services/auth`)
- Definiscono gli obiettivi, gli input, i tool/script da usare, gli output e i casi limite
- Istruzioni in linguaggio naturale, come le daresti a un dipendente di medio livello

**Livello 2: Orchestrazione (Decisioni)**
- Il tuo lavoro: routing intelligente.
- Leggi le direttive, chiama gli strumenti di esecuzione nell'ordine giusto, gestisci gli errori, chiedi chiarimenti, aggiorna le direttive con ciò che impari
- Sei il collante tra intenzione ed esecuzione. Per esempio, non provi a fare scraping di siti web tu stesso—leggi `services/<NOME_SERVIZIO>/<NOME_SERVIZIO>.md` e definisci input/output e poi esegui `services/<NOME_SERVIZIO>//scrape_single_site.js`

**Livello 3: Esecuzione (Fare il lavoro)**
- Controlla prima IMPLEMENTATION_GUIDE.md nella cartella `/docs`
- Script Node.js deterministici in `services/<NOME_SERVIZIO>/`
- Variabili d'ambiente, token API, ecc sono salvati in `.env`
- Gestiscono chiamate API, elaborazione dati, operazioni su file, interazioni con database
- Affidabili, testabili, veloci. Usa script invece di lavoro manuale. Ben commentati.
- IMPORTANTE: Forza LF per tutti i file di testo che crei o modifichi!

**Perché funziona:** se fai tutto tu stesso, gli errori si sommano. 90% di accuratezza per step = 59% di successo su 5 step. La soluzione è spingere la complessità in codice deterministico. Così tu ti concentri solo sul decision-making.

## Principi Operativi

**1. Controlla prima i tool esistenti**
Prima di scrivere uno script, controlla `services/<NOME_SERVIZIO>/` secondo la tua direttiva. Crea nuovi script solo se non ne esistono.

**2. Auto-correggiti quando qualcosa si rompe**
- Leggi il messaggio di errore e lo stack trace
- Correggi lo script e testalo di nuovo (a meno che non usi token/crediti a pagamento—in quel caso chiedi prima all'utente)
- Aggiorna la direttiva con ciò che hai imparato (limiti API, timing, casi limite)
- Esempio: hai un rate limit API → allora guardi nell'API → trovi un batch endpoint che risolverebbe → riscrivi lo script per adattarlo → testi → aggiorna la direttiva.

**3. Aggiorna le direttive mentre impari**
Le direttive sono documenti vivi. Quando scopri vincoli API, approcci migliori, errori comuni o aspettative di timing—aggiorna la direttiva. Ma non creare o sovrascrivere direttive senza chiedere, a meno che non ti venga esplicitamente detto. Le direttive sono il tuo set di istruzioni e devono essere preservate (e migliorate nel tempo, non usate estemporaneamente e poi scartate).

## Loop di auto-correzione

Gli errori sono opportunità di apprendimento. Quando qualcosa si rompe:
1. Correggilo
2. Aggiorna il tool
3. Testa il tool, assicurati che funzioni
4. Aggiorna la direttiva per includere il nuovo flusso
5. Il sistema ora è più forte

## Sviluppo Applicazioni Web

## 🏗 Panoramica Architettura

```
                                    ┌─────────────────┐
                                    │    INTERNET     │
                                    └────────┬────────┘
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                              LOAD BALANCER                                  │
│                         (Traefik / NGINX Ingress)                          │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY (:3000)                            │
│                                                                             │
│  • Routing delle richieste      • Rate Limiting                            │
│  • Autenticazione JWT           • Logging centralizzato                    │
│  • Validazione token            • Correlation ID                           │
└─────────┬─────────────────────────┬─────────────────────────┬──────────────┘
          │                         │                         │
          ▼                         ▼                         ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  AUTH SERVICE   │      │ PRODUCT SERVICE │      │  ORDER SERVICE  │
│    (:3001)      │      │    (:3002)      │      │    (:3003)      │
│                 │      │                 │      │                 │
│ • Login/Logout  │      │ • CRUD Prodotti │      │ • Gestione      │
│ • Registrazione │      │ • Categorie     │      │   Ordini        │
│ • JWT Tokens    │      │ • Ricerca       │      │ • Stati ordine  │
│ • Reset password│      │ • Varianti      │      │ • Storico       │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   PostgreSQL    │      │   PostgreSQL    │      │   PostgreSQL    │
│    auth_db      │      │  products_db    │      │   orders_db     │
└─────────────────┘      └─────────────────┘      └─────────────────┘

                    ┌─────────────────────────────────┐
                    │        SHARED SERVICES          │
                    │                                 │
                    │  ┌─────────┐    ┌───────────┐  │
                    │  │  Redis  │    │ RabbitMQ  │  │
                    │  │ (Cache) │    │ (Events)  │  │
                    │  └─────────┘    └───────────┘  │
                    └─────────────────────────────────┘
```

### Stack Tecnologico

| Componente | Tecnologia | Versione |
|------------|------------|----------|
| Runtime | Node.js | 20 LTS |
| Framework | Express.js | 4.x |
| Database | PostgreSQL | 15 |
| ORM | Prisma | 5.x |
| Cache | Redis | 7 |
| Message Broker | RabbitMQ | 3.x |
| Container | Docker | 24+ |
| Orchestrazione | Docker Swarm / Kubernetes | - |

---
Usa invece lo stack tecnologico specificato, se diversamente specificato.

## 📁 Struttura Directory

```
ecommerce-platform/
│
├── 📄 .env.example                    # Template variabili ambiente
├── 📄 .gitattributes                  # Configurazione Git (line endings)
├── 📄 .editorconfig                   # Configurazione editor
├── 📄 docker-compose.yml              # Sviluppo locale
├── 📄 README.md                       # Documentazione principale
│
├── 📂 .pnpm-store/                    # Store pnpm
│
├── 📂 .vscode/                        # Configurazione VS Code
│   ├── settings.json                  # Impostazioni progetto
│   └── extensions.json                # Estensioni raccomandate
│
├── 📂 docs/                           # Documentazione
│   ├── WINDOWS_TO_LINUX.md           # Guida cross-platform
│   ├── LINUX_DISTRO_GUIDE.md         # Guida distribuzioni Linux
│   └── IMPLEMENTATION_GUIDE.md       # Questa guida
│
├── 📂 services/                       # Microservizi
│   │
│   ├── 📂 api-gateway/               # Gateway API (porta 3000)
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── 📂 src/
│   │       ├── app.js                # Entry point
│   │       ├── 📂 config/
│   │       │   └── index.js          # Configurazioni
│   │       ├── 📂 middlewares/
│   │       │   ├── auth.middleware.js
│   │       │   ├── rateLimiter.middleware.js
│   │       │   └── error.middleware.js
│   │       └── 📂 routes/
│   │           └── index.js          # Routing verso microservizi
│   │
│   ├── 📂 auth-service/              # Servizio Autenticazione (porta 3001)
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── 📂 prisma/
│   │   │   └── schema.prisma         # Schema database utenti
│   │   └── 📂 src/
│   │       ├── app.js
│   │       ├── 📂 config/
│   │       │   ├── index.js
│   │       │   ├── database.js
│   │       │   └── messageBroker.js
│   │       ├── 📂 controllers/
│   │       │   └── auth.controller.js
│   │       ├── 📂 services/
│   │       │   └── auth.service.js
│   │       ├── 📂 repositories/
│   │       │   └── user.repository.js
│   │       ├── 📂 validators/
│   │       │   └── auth.validator.js
│   │       ├── 📂 middlewares/
│   │       │   └── error.middleware.js
│   │       └── 📂 routes/
│   │           └── index.js
│   │
│   └── 📂 product-service/           # Servizio Prodotti (porta 3002)
│       ├── Dockerfile
│       ├── package.json
│       ├── 📂 prisma/
│       │   └── schema.prisma         # Schema database prodotti
│       └── 📂 src/
│           ├── app.js
│           ├── 📂 config/
│           │   ├── index.js
│           │   ├── database.js
│           │   ├── cache.js
│           │   └── messageBroker.js
│           ├── 📂 controllers/
│           │   └── product.controller.js
│           ├── 📂 services/
│           │   └── product.service.js
│           ├── 📂 repositories/
│           │   ├── product.repository.js
│           │   └── category.repository.js
│           ├── 📂 validators/
│           │   └── product.validator.js
│           ├── 📂 middlewares/
│           │   └── error.middleware.js
│           └── 📂 routes/
│               └── index.js
│
├── 📂 shared/                         # Codice condiviso
│   ├── 📂 events/
│   │   └── index.js                  # Event types, exchanges, queues
│   └── 📂 utils/
│       └── apiResponse.js            # Response helpers, errors
│
├── 📂 frontend/                       # Frontend React
│   └── 📂 store-app/
│       ├── package.json
│       ├── I18N_README.md
│       ├── 📂 public/
│       │   └── 📂 locales/           # Traduzioni i18n
│       │       ├── 📂 it/
│       │       ├── 📂 en/
│       │       └── 📂 de/
│       └── 📂 src/
│           ├── main.jsx
│           ├── App.jsx
│           ├── 📂 i18n/
│           ├── 📂 hooks/
│           └── 📂 components/
│
└── 📂 infrastructure/                 # Configurazioni deployment
    │
    ├── 📄 ORCHESTRATION_COMPARISON.md # Confronto Swarm vs K8s
    │
    ├── 📂 swarm/                      # Docker Swarm
    │   ├── docker-stack.yml          # Stack file produzione
    │   └── README.md                 # Istruzioni Swarm
    │
    └── 📂 k8s/                        # Kubernetes
        ├── README.md                 # Istruzioni K8s
        ├── 📂 base/                  # Manifesti base
        │   ├── kustomization.yaml
        │   ├── namespace.yaml
        │   ├── configmap.yaml
        │   ├── secrets.yaml
        │   ├── api-gateway.yaml
        │   ├── auth-service.yaml
        │   ├── product-service.yaml
        │   ├── postgres.yaml
        │   ├── redis.yaml
        │   ├── rabbitmq.yaml
        │   └── ingress.yaml
        └── 📂 overlays/              # Overlay per ambiente
            ├── 📂 development/
            │   └── kustomization.yaml
            ├── 📂 staging/
            │   └── kustomization.yaml
            └── 📂 production/
                └── kustomization.yaml
```

## Organizzazione File

**Deliverable vs Intermedi:**
- **Deliverable**: Google Sheets, Google Slides o altri output cloud-based a cui l'utente può accedere
- **Intermedi**: File temporanei necessari durante l'elaborazione

**Struttura directory:**
- `.tmp/` - Tutti i file intermedi (dossier, dati scraped, export temporanei). Mai committare, sempre rigenerati.
- `.env` - Variabili d'ambiente e chiavi API
- `credentials.json`, `token.json` - Credenziali OAuth Google (file necessari, in `.gitignore`)

**Importante: Documentazione**
Controlla sempre nella cartella `docs/` per trovare la documentazione del progetto, in paritolare attieniti alle istruzioni contenute in `docs/IMPLEMENTATION_GUIDE.md`.
Inoltre, attieniti alle istruzioni contenute nei vari file nella cartella `conductor/`. Guarda in particolare `conductor/index.md` per avere una panoramica generale. In più, guarda `conductor/tracks/` per trovare le istruzioni specifiche per ogni task e le altre sotto-cartelle per trovare le istruzioni ad esempio per lo stile del frontend.

**Principio chiave:** I file locali sono solo per l'elaborazione. I deliverable vivono nei servizi cloud (Google Sheets, Slides, ecc.) dove l'utente può accedervi. Tutto in `.tmp/` può essere cancellato e rigenerato.

## Riepilogo

Ti posizioni tra intenzione umana (direttive) ed esecuzione deterministica (script Node.js). Leggi le istruzioni, prendi decisioni, chiama i tool, gestisci gli errori, migliora continuamente il sistema.

Sii pragmatico. Sii affidabile. Auto-correggiti.

IMPORTANTE: Forza LF per tutti i file di testo che crei o modifichi!
```