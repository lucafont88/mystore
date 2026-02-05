# E-commerce Microservizi - Guida Completa all'Implementazione

Guida passo-passo per implementare un e-commerce basato su microservizi con Node.js, deployabile sia su Docker Swarm che su Kubernetes.

---

## 📋 Indice

1. [Panoramica Architettura](#-panoramica-architettura)
2. [Struttura Directory](#-struttura-directory)
3. [Prerequisiti](#-prerequisiti)
4. [Setup Ambiente di Sviluppo](#-setup-ambiente-di-sviluppo)
5. [Implementazione Microservizi](#-implementazione-microservizi)
6. [Deploy con Docker Swarm](#-deploy-con-docker-swarm)
7. [Deploy con Kubernetes](#-deploy-con-kubernetes)
8. [Test e Verifica](#-test-e-verifica)
9. [Prossimi Passi](#-prossimi-passi)

---

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
│   │   ├── pnpm-lock.yaml
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
│   │   ├── pnpm-lock.yaml
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
│   │   ├── pnpm-lock.yaml
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
│   │   ├── pnpm-lock.yaml
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

---

## 🔧 Prerequisiti

### Software Richiesto

| Software | Versione | Download |
|----------|----------|----------|
| Node.js | 20 LTS | https://nodejs.org |
| Docker Desktop | 4.x | https://docker.com |
| Git | 2.x | https://git-scm.com |
| VS Code | Latest | https://code.visualstudio.com |

### Per Windows (Raccomandato)

```powershell
# Installa WSL2
wsl --install -d Ubuntu-22.04

# Installa Docker Desktop con backend WSL2
# Scarica da https://docker.com e abilita WSL2 nelle impostazioni
```

### Per Linux (Ubuntu/Debian)

```bash
# Installa Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Installa Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 💻 Setup Ambiente di Sviluppo

### Step 1: Clona/Scarica il Progetto

```bash
# Se hai Git
git clone <repository-url>
cd ecommerce-platform

# Oppure estrai lo ZIP scaricato
unzip ecommerce-platform.zip
cd ecommerce-platform
```

### Step 2: Configura le Variabili d'Ambiente

```bash
# Copia il template
cp .env.example .env

# Modifica con i tuoi valori
nano .env  # o usa VS Code
```

**File `.env` esempio:**

```env
# Node
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# PostgreSQL
POSTGRES_USER=ecommerce
POSTGRES_PASSWORD=localdevpassword

# Database URLs
AUTH_DATABASE_URL=postgres://ecommerce:localdevpassword@localhost:5432/auth_db
PRODUCT_DATABASE_URL=postgres://ecommerce:localdevpassword@localhost:5433/products_db

# Redis
REDIS_URL=redis://localhost:6379

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
```

### Step 3: Installa Dipendenze (per sviluppo locale)

```bash
# API Gateway
cd services/api-gateway && npm install && cd ../..

# Auth Service
cd services/auth-service && npm install && cd ../..

# Product Service
cd services/product-service && npm install && cd ../..

# Frontend (opzionale)
cd frontend/store-app && npm install && cd ../..
```

### Step 4: Avvia l'Ambiente di Sviluppo

```bash
# Avvia tutti i servizi con Docker Compose
docker compose up -d

# Verifica che tutti i container siano running
docker compose ps

# Output atteso:
# NAME                    STATUS          PORTS
# api-gateway             running         0.0.0.0:3000->3000/tcp
# auth-service            running         0.0.0.0:3001->3001/tcp
# product-service         running         0.0.0.0:3002->3002/tcp
# postgres-auth           running         0.0.0.0:5432->5432/tcp
# postgres-products       running         0.0.0.0:5433->5432/tcp
# redis                   running         0.0.0.0:6379->6379/tcp
# rabbitmq                running         0.0.0.0:5672->5672/tcp, 0.0.0.0:15672->15672/tcp
```

### Step 5: Esegui le Migrazioni Database

```bash
# Auth Service
docker compose exec auth-service npx prisma migrate dev --name init

# Product Service
docker compose exec product-service npx prisma migrate dev --name init
```

### Step 6: Verifica che Tutto Funzioni

```bash
# Health check API Gateway
curl http://localhost:3000/health

# Health check Auth Service
curl http://localhost:3001/health

# Health check Product Service
curl http://localhost:3002/health

# RabbitMQ Management UI
# Apri: http://localhost:15672 (guest/guest)
```

---

## 🔨 Implementazione Microservizi

### Flusso di Autenticazione

```
┌──────────┐     POST /api/v1/auth/register     ┌─────────────┐
│  Client  │ ─────────────────────────────────▶ │ API Gateway │
└──────────┘                                    └──────┬──────┘
                                                       │
                                                       ▼
                                               ┌─────────────┐
                                               │Auth Service │
                                               │             │
                                               │ 1. Valida   │
                                               │ 2. Hash pwd │
                                               │ 3. Salva DB │
                                               │ 4. Pubblica │
                                               │    evento   │
                                               └──────┬──────┘
                                                      │
                         ◀────────────────────────────┘
                    { user, accessToken, refreshToken }
```

### API Endpoints Implementati

#### Auth Service (`/api/v1/auth`)

| Metodo | Endpoint | Descrizione | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Registra nuovo utente | No |
| POST | `/login` | Login, ritorna JWT | No |
| POST | `/refresh` | Rinnova access token | No |
| POST | `/logout` | Invalida refresh token | Sì |
| POST | `/forgot-password` | Richiedi reset password | No |
| POST | `/reset-password` | Reimposta password | No |
| GET | `/profile` | Profilo utente corrente | Sì |
| PUT | `/profile` | Aggiorna profilo | Sì |

#### Product Service (`/api/v1/products`)

| Metodo | Endpoint | Descrizione | Auth |
|--------|----------|-------------|------|
| GET | `/` | Lista prodotti (paginata) | No |
| GET | `/:id` | Dettaglio prodotto | No |
| GET | `/slug/:slug` | Prodotto per slug | No |
| GET | `/search` | Ricerca prodotti | No |
| GET | `/featured` | Prodotti in evidenza | No |
| POST | `/admin/products` | Crea prodotto | Admin |
| PUT | `/admin/products/:id` | Aggiorna prodotto | Admin |
| DELETE | `/admin/products/:id` | Elimina prodotto | Admin |
| GET | `/categories` | Lista categorie | No |
| GET | `/categories/tree` | Albero categorie | No |

### Esempio: Registrazione Utente

```bash
# Registra un nuovo utente
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mario.rossi@example.com",
    "password": "SecurePass123!",
    "firstName": "Mario",
    "lastName": "Rossi"
  }'

# Response
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-xxx",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "customer"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Esempio: Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mario.rossi@example.com",
    "password": "SecurePass123!"
  }'
```

### Esempio: Lista Prodotti

```bash
# Lista paginata
curl "http://localhost:3000/api/v1/products?page=1&limit=10"

# Ricerca
curl "http://localhost:3000/api/v1/products/search?q=iphone&minPrice=500"

# Con autenticazione (per vedere prezzi riservati, ecc.)
curl "http://localhost:3000/api/v1/products" \
  -H "Authorization: Bearer <access-token>"
```

---

## 🐳 Deploy con Docker Swarm

### Architettura Swarm

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOCKER SWARM CLUSTER                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     MANAGER NODE                            │ │
│  │                                                             │ │
│  │  • Swarm orchestration     • Traefik (Load Balancer)       │ │
│  │  • Service scheduling      • SSL termination               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐     │
│  │  WORKER 1   │      │  WORKER 2   │      │  WORKER 3   │     │
│  │             │      │             │      │             │     │
│  │ API Gateway │      │ API Gateway │      │ Auth Svc    │     │
│  │ Auth Svc    │      │ Product Svc │      │ Product Svc │     │
│  │ Product Svc │      │             │      │             │     │
│  └─────────────┘      └─────────────┘      └─────────────┘     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     DATA NODE (etichettato)                 │ │
│  │                                                             │ │
│  │  PostgreSQL (auth_db)  │  PostgreSQL (products_db)         │ │
│  │  Redis                 │  RabbitMQ                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step 1: Prepara i Server

**Requisiti minimi:**
- 1 Manager: 2 CPU, 4GB RAM
- 2+ Worker: 2 CPU, 4GB RAM ciascuno
- 1 Data node: 4 CPU, 8GB RAM (per database)

```bash
# Su ogni server (Ubuntu 22.04)
sudo apt update && sudo apt upgrade -y

# Installa Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Configura firewall
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 2377/tcp    # Swarm cluster management
sudo ufw allow 7946/tcp    # Node communication
sudo ufw allow 7946/udp    # Node communication
sudo ufw allow 4789/udp    # Overlay network
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

### Step 2: Inizializza Swarm

```bash
# Sul MANAGER
docker swarm init --advertise-addr <MANAGER_IP>

# Salva il comando di join che viene mostrato!
# Esempio output:
# docker swarm join --token SWMTKN-1-xxx <MANAGER_IP>:2377
```

### Step 3: Aggiungi Worker Nodes

```bash
# Su ogni WORKER, esegui il comando copiato dal manager
docker swarm join --token SWMTKN-1-xxx <MANAGER_IP>:2377
```

### Step 4: Etichetta i Nodi

```bash
# Sul MANAGER
# Vedi tutti i nodi
docker node ls

# Etichetta il nodo per i database
docker node update --label-add db=true <DATA_NODE_ID>
docker node update --label-add cache=true <DATA_NODE_ID>
docker node update --label-add mq=true <DATA_NODE_ID>
```

### Step 5: Crea i Docker Secrets

```bash
# Sul MANAGER
# JWT Secret (genera con: openssl rand -hex 32)
echo "tuo-jwt-secret-molto-lungo-almeno-32-caratteri" | docker secret create jwt_secret -

# PostgreSQL
echo "ecommerce" | docker secret create postgres_user -
echo "$(openssl rand -base64 24)" | docker secret create postgres_password -

# Salva la password generata per usarla negli URL!
# Esempio: XyZ123AbC456...

# Database URLs (sostituisci PASSWORD con quella generata sopra)
echo "postgres://ecommerce:PASSWORD@postgres-auth:5432/auth_db" | docker secret create auth_database_url -
echo "postgres://ecommerce:PASSWORD@postgres-products:5432/products_db" | docker secret create product_database_url -

# RabbitMQ
echo "ecommerce" | docker secret create rabbitmq_user -
echo "$(openssl rand -base64 16)" | docker secret create rabbitmq_password -
echo "amqp://ecommerce:PASSWORD@rabbitmq:5672" | docker secret create rabbitmq_url -

# Verifica
docker secret ls
```

### Step 6: Build e Push delle Immagini

```bash
# Sul tuo PC di sviluppo

# Opzione A: Docker Hub
docker login

docker build -t tuousername/api-gateway:v1.0.0 ./services/api-gateway
docker build -t tuousername/auth-service:v1.0.0 ./services/auth-service
docker build -t tuousername/product-service:v1.0.0 ./services/product-service

docker push tuousername/api-gateway:v1.0.0
docker push tuousername/auth-service:v1.0.0
docker push tuousername/product-service:v1.0.0

# Opzione B: Registry privato (sul manager)
docker service create --name registry --publish 5000:5000 registry:2

docker build -t <MANAGER_IP>:5000/api-gateway:v1.0.0 ./services/api-gateway
docker push <MANAGER_IP>:5000/api-gateway:v1.0.0
# ... ripeti per gli altri servizi
```

### Step 7: Modifica docker-stack.yml

```bash
# Modifica infrastructure/swarm/docker-stack.yml
# Sostituisci le immagini con quelle che hai pushato

# Esempio:
# image: tuousername/api-gateway:v1.0.0
```

### Step 8: Deploy dello Stack

```bash
# Sul MANAGER
cd infrastructure/swarm

# Deploy
docker stack deploy -c docker-stack.yml ecommerce

# Verifica
docker stack services ecommerce
docker stack ps ecommerce
```

### Step 9: Esegui Migrazioni

```bash
# Trova un container auth-service
docker ps | grep auth-service

# Esegui migrazione
docker exec -it <CONTAINER_ID> npx prisma migrate deploy

# Ripeti per product-service
docker exec -it <PRODUCT_CONTAINER_ID> npx prisma migrate deploy
```

### Step 10: Verifica Deployment

```bash
# Health checks
curl http://<MANAGER_IP>/api/v1/health
curl http://<MANAGER_IP>/api/v1/auth/health
curl http://<MANAGER_IP>/api/v1/products/health

# Logs
docker service logs ecommerce_api-gateway -f
docker service logs ecommerce_auth-service -f
```

### Comandi Utili Swarm

```bash
# Scala un servizio
docker service scale ecommerce_api-gateway=5

# Aggiorna immagine
docker service update --image tuousername/api-gateway:v1.1.0 ecommerce_api-gateway

# Rollback
docker service rollback ecommerce_api-gateway

# Rimuovi stack
docker stack rm ecommerce
```

---

## ☸️ Deploy con Kubernetes

### Architettura Kubernetes

```
┌─────────────────────────────────────────────────────────────────┐
│                      KUBERNETES CLUSTER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    CONTROL PLANE                            │ │
│  │  • API Server    • Scheduler    • Controller Manager       │ │
│  │  • etcd                                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌───────────────────────────┴───────────────────────────────┐  │
│  │                    NAMESPACE: ecommerce                    │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │   Ingress    │  │   Ingress    │  │   Ingress    │    │  │
│  │  │   Controller │  │   (Rules)    │  │   (TLS)      │    │  │
│  │  └──────┬───────┘  └──────────────┘  └──────────────┘    │  │
│  │         │                                                  │  │
│  │         ▼                                                  │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              SERVICE: api-gateway                     │ │  │
│  │  │                    (ClusterIP)                        │ │  │
│  │  └────────────────────────┬─────────────────────────────┘ │  │
│  │                           │                                │  │
│  │         ┌─────────────────┼─────────────────┐             │  │
│  │         ▼                 ▼                 ▼             │  │
│  │  ┌────────────┐    ┌────────────┐    ┌────────────┐      │  │
│  │  │  Pod #1    │    │  Pod #2    │    │  Pod #3    │      │  │
│  │  │api-gateway │    │api-gateway │    │api-gateway │      │  │
│  │  └────────────┘    └────────────┘    └────────────┘      │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐   │  │
│  │  │     HorizontalPodAutoscaler (HPA)                   │   │  │
│  │  │     min: 2, max: 10, targetCPU: 70%                │   │  │
│  │  └────────────────────────────────────────────────────┘   │  │
│  │                                                            │  │
│  │  [Stessa struttura per auth-service e product-service]    │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐   │  │
│  │  │              StatefulSets (Database)                │   │  │
│  │  │  • postgres-auth (PVC: 10Gi)                       │   │  │
│  │  │  • postgres-products (PVC: 20Gi)                   │   │  │
│  │  │  • redis                                            │   │  │
│  │  │  • rabbitmq (PVC: 5Gi)                             │   │  │
│  │  └────────────────────────────────────────────────────┘   │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Opzione A: Kubernetes Self-Managed con k3s

**Ideale per:** VPS, server dedicati, budget limitato

#### Step 1: Installa k3s sul Master

```bash
# Sul server MASTER (Ubuntu 22.04)
curl -sfL https://get.k3s.io | sh -

# Verifica installazione
sudo kubectl get nodes

# Ottieni token per i worker
sudo cat /var/lib/rancher/k3s/server/node-token
```

#### Step 2: Aggiungi Worker Nodes

```bash
# Su ogni WORKER
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<TOKEN> sh -
```

#### Step 3: Configura kubectl sul tuo PC

```bash
# Copia kubeconfig dal master
scp user@<MASTER_IP>:/etc/rancher/k3s/k3s.yaml ~/.kube/config

# Modifica l'indirizzo del server
sed -i 's/127.0.0.1/<MASTER_IP>/g' ~/.kube/config

# Verifica
kubectl get nodes
```

### Opzione B: Kubernetes Managed (GKE, EKS, AKS)

**Ideale per:** Produzione, team più grandi, auto-scaling

#### Google GKE (consigliato)

```bash
# Installa gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login
gcloud config set project <PROJECT_ID>

# Crea cluster (Autopilot - gestito completamente)
gcloud container clusters create-auto ecommerce-cluster \
  --region europe-west1

# Oppure: cluster Standard (più controllo)
gcloud container clusters create ecommerce-cluster \
  --num-nodes 3 \
  --machine-type e2-medium \
  --region europe-west1

# Configura kubectl
gcloud container clusters get-credentials ecommerce-cluster --region europe-west1
```

#### AWS EKS

```bash
# Installa eksctl
# https://eksctl.io/

# Crea cluster
eksctl create cluster \
  --name ecommerce-cluster \
  --region eu-west-1 \
  --nodes 3 \
  --node-type t3.medium
```

### Step 3: Configura Secrets Kubernetes

```bash
# Crea namespace
kubectl create namespace ecommerce

# Crea secrets (modifica i valori!)
kubectl create secret generic ecommerce-secrets \
  --namespace ecommerce \
  --from-literal=JWT_SECRET="tuo-jwt-secret-molto-lungo" \
  --from-literal=POSTGRES_USER="ecommerce" \
  --from-literal=POSTGRES_PASSWORD="$(openssl rand -base64 24)" \
  --from-literal=AUTH_DATABASE_URL="postgres://ecommerce:PASSWORD@postgres-auth:5432/auth_db" \
  --from-literal=PRODUCT_DATABASE_URL="postgres://ecommerce:PASSWORD@postgres-products:5432/products_db" \
  --from-literal=RABBITMQ_USER="ecommerce" \
  --from-literal=RABBITMQ_PASSWORD="$(openssl rand -base64 16)" \
  --from-literal=RABBITMQ_URL="amqp://ecommerce:PASSWORD@rabbitmq-service:5672"
```

### Step 4: Build e Push Immagini

```bash
# Per GKE
gcloud auth configure-docker

docker build -t gcr.io/<PROJECT_ID>/api-gateway:v1.0.0 ./services/api-gateway
docker push gcr.io/<PROJECT_ID>/api-gateway:v1.0.0

# Per EKS (usa ECR)
aws ecr get-login-password | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

docker build -t <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/api-gateway:v1.0.0 ./services/api-gateway
docker push <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/api-gateway:v1.0.0
```

### Step 5: Modifica i Manifesti K8s

```bash
# Modifica infrastructure/k8s/overlays/production/kustomization.yaml
# Aggiorna le immagini con quelle pushate

images:
  - name: ecommerce/api-gateway
    newName: gcr.io/<PROJECT_ID>/api-gateway
    newTag: v1.0.0
```

### Step 6: Deploy con Kustomize

```bash
# Development (risorse minime)
kubectl apply -k infrastructure/k8s/overlays/development

# Production (HA, auto-scaling)
kubectl apply -k infrastructure/k8s/overlays/production

# Verifica
kubectl get all -n ecommerce
```

### Step 7: Esegui Migrazioni

```bash
# Trova pod auth-service
kubectl get pods -n ecommerce | grep auth-service

# Esegui migrazione
kubectl exec -it <POD_NAME> -n ecommerce -- npx prisma migrate deploy

# Ripeti per product-service
```

### Step 8: Configura Ingress

```bash
# Installa NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml

# Verifica
kubectl get svc -n ingress-nginx

# L'EXTERNAL-IP è l'indirizzo del tuo load balancer
# Punta il tuo dominio DNS a questo IP
```

### Step 9: Verifica Deployment

```bash
# Status pods
kubectl get pods -n ecommerce

# Status services
kubectl get svc -n ecommerce

# Logs
kubectl logs -f deployment/api-gateway -n ecommerce

# Port forward per test locale
kubectl port-forward svc/api-gateway 3000:3000 -n ecommerce

# Test
curl http://localhost:3000/health
```

### Comandi Utili Kubernetes

```bash
# Scala deployment
kubectl scale deployment api-gateway --replicas=5 -n ecommerce

# Aggiorna immagine
kubectl set image deployment/api-gateway api-gateway=gcr.io/<PROJECT>/api-gateway:v1.1.0 -n ecommerce

# Rollback
kubectl rollout undo deployment/api-gateway -n ecommerce

# Visualizza HPA
kubectl get hpa -n ecommerce

# Risorse consumate
kubectl top pods -n ecommerce

# Shell in un pod
kubectl exec -it <POD_NAME> -n ecommerce -- sh

# Elimina tutto
kubectl delete -k infrastructure/k8s/overlays/production
```

---

## 🧪 Test e Verifica

### Test Manuali con cURL

```bash
# Imposta URL base
BASE_URL="http://localhost:3000"  # Sviluppo
# BASE_URL="https://api.tuodominio.com"  # Produzione

# 1. Health Check
curl $BASE_URL/health

# 2. Registrazione
curl -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "Test",
    "lastName": "User"
  }'

# 3. Login (salva il token)
TOKEN=$(curl -s -X POST $BASE_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123!@#"}' \
  | jq -r '.data.accessToken')

echo "Token: $TOKEN"

# 4. Profilo utente (con auth)
curl $BASE_URL/api/v1/users/profile \
  -H "Authorization: Bearer $TOKEN"

# 5. Lista prodotti (pubblico)
curl "$BASE_URL/api/v1/products?page=1&limit=10"

# 6. Ricerca prodotti
curl "$BASE_URL/api/v1/products/search?q=test"

# 7. Categorie
curl $BASE_URL/api/v1/categories/tree
```

### Test con Thunder Client / Postman

Importa questa collection:

```json
{
  "name": "E-commerce API",
  "requests": [
    {
      "name": "Health Check",
      "method": "GET",
      "url": "{{baseUrl}}/health"
    },
    {
      "name": "Register",
      "method": "POST",
      "url": "{{baseUrl}}/api/v1/auth/register",
      "body": {
        "email": "{{email}}",
        "password": "{{password}}",
        "firstName": "Test",
        "lastName": "User"
      }
    },
    {
      "name": "Login",
      "method": "POST",
      "url": "{{baseUrl}}/api/v1/auth/login",
      "body": {
        "email": "{{email}}",
        "password": "{{password}}"
      }
    },
    {
      "name": "Get Profile",
      "method": "GET",
      "url": "{{baseUrl}}/api/v1/users/profile",
      "headers": {
        "Authorization": "Bearer {{accessToken}}"
      }
    },
    {
      "name": "List Products",
      "method": "GET",
      "url": "{{baseUrl}}/api/v1/products"
    }
  ],
  "variables": {
    "baseUrl": "http://localhost:3000",
    "email": "test@example.com",
    "password": "Test123!@#"
  }
}
```

---

## 🚀 Prossimi Passi

### Microservizi da Aggiungere

| Servizio | Priorità | Descrizione |
|----------|----------|-------------|
| **Order Service** | Alta | Gestione ordini, checkout |
| **Cart Service** | Alta | Carrello (Redis-based) |
| **Payment Service** | Alta | Integrazione Stripe/PayPal |
| **Notification Service** | Media | Email, SMS, Push |
| **Inventory Service** | Media | Gestione stock, warehouse |
| **Media Service** | Media | Upload immagini, CDN |
| **Search Service** | Bassa | Elasticsearch per ricerca avanzata |
| **Analytics Service** | Bassa | Tracking, reportistica |

### Miglioramenti Infrastruttura

1. **CI/CD Pipeline**
   - GitHub Actions / GitLab CI
   - Build automatico immagini
   - Deploy automatico su merge

2. **Monitoring**
   - Prometheus + Grafana
   - Loki per logs centralizzati
   - Alerting

3. **Security**
   - cert-manager per SSL automatico
   - Network Policies
   - Pod Security Policies

4. **Database**
   - Migra a managed (RDS, Cloud SQL)
   - Backup automatici
   - Read replicas

### Checklist Go-Live

```
□ Tutti i servizi rispondono ai health check
□ Database migrati e con dati iniziali
□ SSL configurato (HTTPS)
□ DNS configurato
□ Monitoring attivo
□ Backup configurati
□ Rate limiting verificato
□ Test di carico eseguiti
□ Documentazione API aggiornata
□ Runbook per incidenti creato
```

---

## 📚 Risorse Utili

### Documentazione

- [Node.js](https://nodejs.org/docs)
- [Express.js](https://expressjs.com)
- [Prisma](https://www.prisma.io/docs)
- [Docker](https://docs.docker.com)
- [Docker Swarm](https://docs.docker.com/engine/swarm)
- [Kubernetes](https://kubernetes.io/docs)

### Tutorial Consigliati

- [12 Factor App](https://12factor.net)
- [Microservices Patterns](https://microservices.io/patterns)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Buono sviluppo! 🚀**

*Documento generato per il progetto E-commerce Microservizi*
