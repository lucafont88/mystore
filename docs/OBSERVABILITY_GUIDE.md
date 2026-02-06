# Observability Stack - Guida Completa

Guida per implementare logging, metrics, tracing e dashboard nel progetto e-commerce microservizi.

---

## 📋 Indice

1. [Panoramica Architettura](#-panoramica-architettura)
2. [Stack Tecnologico](#-stack-tecnologico)
3. [Configurazione Docker Compose](#-configurazione-docker-compose)
4. [Configurazione Servizi](#-configurazione-servizi)
5. [Dashboard Grafana](#-dashboard-grafana)
6. [Alerting](#-alerting)
7. [Prompt per Implementazione con AI](#-prompt-per-implementazione-con-ai)

---

## 🏗 Panoramica Architettura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MICROSERVIZI                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ API Gateway │  │Auth Service │  │Product Svc  │  │ Order Svc   │        │
│  │   :3000     │  │   :3001     │  │   :3002     │  │   :3003     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         │ Pino (logs)    │                │                │                │
│         │ prom-client    │                │                │                │
│         │ OpenTelemetry  │                │                │                │
│         │                │                │                │                │
└─────────┴────────────────┴────────────────┴────────────────┴────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              COLLECTORS                                      │
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │                         ALLOY                                      │    │
│   │            (Unified Collector - logs, metrics, traces)            │    │
│   │                                                                    │    │
│   │   Alternativa: Promtail (logs) + OTel Collector (traces)         │    │
│   └───────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│      LOKI       │  │   PROMETHEUS    │  │     TEMPO       │
│     (Logs)      │  │   (Metrics)     │  │   (Traces)      │
│                 │  │                 │  │                 │
│ • Structured    │  │ • Time-series   │  │ • Distributed   │
│ • Label-based   │  │ • PromQL        │  │ • Span data     │
│ • Lightweight   │  │ • Alerting      │  │ • Service map   │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │     GRAFANA     │
                    │                 │
                    │ • Dashboards    │
                    │ • Alerting      │
                    │ • Explore       │
                    │ • Correlazione  │
                    └─────────────────┘
```

---

## 🛠 Stack Tecnologico

### Backend (Node.js)

| Componente | Libreria | Scopo |
|------------|----------|-------|
| Logging | **Pino** | Logger JSON strutturato, velocissimo |
| Metrics | **prom-client** | Prometheus metrics per Node.js |
| Tracing | **@opentelemetry/*** | Distributed tracing standard |
| HTTP metrics | **express-prom-bundle** | Metrics automatiche per Express |

### Infrastructure

| Componente | Tool | Porta | Scopo |
|------------|------|-------|-------|
| Log aggregation | **Loki** | 3100 | Storage e query logs |
| Log collector | **Promtail** | - | Raccoglie logs dai container |
| Metrics | **Prometheus** | 9090 | Storage e query metrics |
| Tracing | **Tempo** | 3200 | Storage e query traces |
| Visualization | **Grafana** | 3001 | Dashboard e alerting |

### Requisiti Risorse

```yaml
# Sviluppo locale (extra ~1.5GB RAM)
prometheus:  256MB
loki:        256MB
tempo:       256MB
grafana:     256MB
promtail:    128MB

# Produzione (VPS dedicato 4GB RAM consigliato)
prometheus:  1GB
loki:        1GB
tempo:       512MB
grafana:     512MB
promtail:    256MB
```

---

## 🐳 Configurazione Docker Compose

### File: `docker-compose.monitoring.yml`

```yaml
# =============================================================================
# Docker Compose - Monitoring Stack (Grafana LGTM)
# =============================================================================
# Uso: docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
# =============================================================================

version: '3.8'

services:
  # ===========================================================================
  # PROMETHEUS - Metrics
  # ===========================================================================
  prometheus:
    image: prom/prometheus:v2.49.1
    container_name: ecommerce-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./infrastructure/monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./infrastructure/monitoring/prometheus/alerts.yml:/etc/prometheus/alerts.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    networks:
      - ecommerce-network
    restart: unless-stopped

  # ===========================================================================
  # LOKI - Logs
  # ===========================================================================
  loki:
    image: grafana/loki:2.9.4
    container_name: ecommerce-loki
    ports:
      - "3100:3100"
    volumes:
      - ./infrastructure/monitoring/loki/loki-config.yml:/etc/loki/local-config.yaml:ro
      - loki_data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - ecommerce-network
    restart: unless-stopped

  # ===========================================================================
  # PROMTAIL - Log Collector
  # ===========================================================================
  promtail:
    image: grafana/promtail:2.9.4
    container_name: ecommerce-promtail
    volumes:
      - ./infrastructure/monitoring/promtail/promtail-config.yml:/etc/promtail/config.yml:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    command: -config.file=/etc/promtail/config.yml
    networks:
      - ecommerce-network
    depends_on:
      - loki
    restart: unless-stopped

  # ===========================================================================
  # TEMPO - Traces
  # ===========================================================================
  tempo:
    image: grafana/tempo:2.3.1
    container_name: ecommerce-tempo
    ports:
      - "3200:3200"   # Tempo API
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
    volumes:
      - ./infrastructure/monitoring/tempo/tempo-config.yml:/etc/tempo/tempo.yaml:ro
      - tempo_data:/tmp/tempo
    command: -config.file=/etc/tempo/tempo.yaml
    networks:
      - ecommerce-network
    restart: unless-stopped

  # ===========================================================================
  # GRAFANA - Visualization
  # ===========================================================================
  grafana:
    image: grafana/grafana:10.3.1
    container_name: ecommerce-grafana
    ports:
      - "3001:3000"  # Porta 3001 per evitare conflitto con API Gateway
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_SERVER_ROOT_URL=http://localhost:3001
      # Provisioning automatico
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
    volumes:
      - ./infrastructure/monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
      - ./infrastructure/monitoring/grafana/dashboards:/var/lib/grafana/dashboards:ro
      - grafana_data:/var/lib/grafana
    networks:
      - ecommerce-network
    depends_on:
      - prometheus
      - loki
      - tempo
    restart: unless-stopped

volumes:
  prometheus_data:
  loki_data:
  tempo_data:
  grafana_data:
```

---

## ⚙️ Configurazione Servizi

### Struttura Directory

```
infrastructure/monitoring/
├── prometheus/
│   ├── prometheus.yml        # Configurazione principale
│   └── alerts.yml            # Regole di alerting
├── loki/
│   └── loki-config.yml       # Configurazione Loki
├── promtail/
│   └── promtail-config.yml   # Configurazione collector logs
├── tempo/
│   └── tempo-config.yml      # Configurazione tracing
└── grafana/
    ├── provisioning/
    │   ├── datasources/
    │   │   └── datasources.yml
    │   └── dashboards/
    │       └── dashboards.yml
    └── dashboards/
        ├── microservices-overview.json
        ├── nodejs-metrics.json
        └── logs-explorer.json
```

### File: `prometheus/prometheus.yml`

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

rule_files:
  - /etc/prometheus/alerts.yml

scrape_configs:
  # Prometheus stesso
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # API Gateway
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api-gateway:3000']
    metrics_path: /metrics

  # Auth Service
  - job_name: 'auth-service'
    static_configs:
      - targets: ['auth-service:3001']
    metrics_path: /metrics

  # Product Service
  - job_name: 'product-service'
    static_configs:
      - targets: ['product-service:3002']
    metrics_path: /metrics

  # PostgreSQL (richiede postgres_exporter)
  - job_name: 'postgresql'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis (richiede redis_exporter)
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Docker containers (cAdvisor)
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
```

### File: `prometheus/alerts.yml`

```yaml
groups:
  - name: microservices
    rules:
      # Servizio down
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Servizio {{ $labels.job }} non raggiungibile"
          description: "{{ $labels.instance }} è down da più di 1 minuto"

      # Alto error rate
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
          /
          sum(rate(http_requests_total[5m])) by (job)
          > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Alto tasso di errori su {{ $labels.job }}"
          description: "Error rate > 5% negli ultimi 5 minuti"

      # Latenza alta
      - alert: HighLatency
        expr: |
          histogram_quantile(0.95, 
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le, job)
          ) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Latenza elevata su {{ $labels.job }}"
          description: "P95 latency > 1s negli ultimi 5 minuti"

      # Memoria alta
      - alert: HighMemoryUsage
        expr: |
          process_resident_memory_bytes / 1024 / 1024 > 450
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Uso memoria elevato su {{ $labels.job }}"
          description: "Memoria > 450MB su {{ $labels.instance }}"

  - name: database
    rules:
      # Connessioni PostgreSQL
      - alert: PostgreSQLTooManyConnections
        expr: |
          sum(pg_stat_activity_count) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Troppe connessioni PostgreSQL"
          description: "Più di 80 connessioni attive"

  - name: infrastructure
    rules:
      # Container restart
      - alert: ContainerRestarting
        expr: |
          increase(container_restart_count[15m]) > 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Container in restart loop"
          description: "{{ $labels.name }} si è riavviato più di 3 volte in 15 minuti"
```

### File: `loki/loki-config.yml`

```yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

limits_config:
  reject_old_samples: true
  reject_old_samples_max_age: 168h
  ingestion_rate_mb: 16
  ingestion_burst_size_mb: 24

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: true
  retention_period: 168h  # 7 giorni
```

### File: `promtail/promtail-config.yml`

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  # Logs da Docker containers
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      # Usa il nome del container come label
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
      
      # Aggiungi label per servizio
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: 'service'
      
      # Aggiungi label per progetto
      - source_labels: ['__meta_docker_container_label_com_docker_compose_project']
        target_label: 'project'
    
    pipeline_stages:
      # Parse JSON logs (Pino format)
      - json:
          expressions:
            level: level
            message: msg
            timestamp: time
            service: name
            traceId: traceId
            spanId: spanId
            requestId: requestId
            method: req.method
            url: req.url
            statusCode: res.statusCode
            responseTime: responseTime
      
      # Mappa i livelli numerici di Pino a stringhe
      - template:
          source: level
          template: '{{ if eq .Value "10" }}trace{{ else if eq .Value "20" }}debug{{ else if eq .Value "30" }}info{{ else if eq .Value "40" }}warn{{ else if eq .Value "50" }}error{{ else if eq .Value "60" }}fatal{{ else }}unknown{{ end }}'
      
      # Aggiungi labels
      - labels:
          level:
          service:
          traceId:
      
      # Output finale
      - output:
          source: message
```

### File: `tempo/tempo-config.yml`

```yaml
server:
  http_listen_port: 3200

distributor:
  receivers:
    otlp:
      protocols:
        http:
          endpoint: 0.0.0.0:4318
        grpc:
          endpoint: 0.0.0.0:4317

ingester:
  max_block_duration: 5m

compactor:
  compaction:
    block_retention: 48h

storage:
  trace:
    backend: local
    local:
      path: /tmp/tempo/blocks
    wal:
      path: /tmp/tempo/wal

querier:
  frontend_worker:
    frontend_address: tempo:9095

metrics_generator:
  registry:
    external_labels:
      source: tempo
  storage:
    path: /tmp/tempo/generator/wal
    remote_write:
      - url: http://prometheus:9090/api/v1/write
        send_exemplars: true
```

### File: `grafana/provisioning/datasources/datasources.yml`

```yaml
apiVersion: 1

datasources:
  # Prometheus - Metrics
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: "15s"
      exemplarTraceIdDestinations:
        - name: traceId
          datasourceUid: tempo

  # Loki - Logs
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    editable: false
    jsonData:
      derivedFields:
        - datasourceUid: tempo
          matcherRegex: '"traceId":"(\w+)"'
          name: TraceID
          url: '$${__value.raw}'
        - datasourceUid: tempo
          matcherRegex: 'traceId=(\w+)'
          name: TraceID
          url: '$${__value.raw}'

  # Tempo - Traces
  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
    uid: tempo
    editable: false
    jsonData:
      httpMethod: GET
      tracesToLogs:
        datasourceUid: loki
        tags: ['service', 'container']
        mappedTags: [{ key: 'service.name', value: 'service' }]
        mapTagNamesEnabled: true
        spanStartTimeShift: '-1h'
        spanEndTimeShift: '1h'
        filterByTraceID: true
        filterBySpanID: false
      tracesToMetrics:
        datasourceUid: prometheus
        tags: [{ key: 'service.name', value: 'service' }]
      serviceMap:
        datasourceUid: prometheus
      nodeGraph:
        enabled: true
      lokiSearch:
        datasourceUid: loki
```

### File: `grafana/provisioning/dashboards/dashboards.yml`

```yaml
apiVersion: 1

providers:
  - name: 'E-commerce Dashboards'
    orgId: 1
    folder: 'E-commerce'
    folderUid: 'ecommerce'
    type: file
    disableDeletion: false
    editable: true
    options:
      path: /var/lib/grafana/dashboards
```

---

## 📊 Dashboard Grafana

### Dashboard Consigliati

| Dashboard | Scopo | Metriche Principali |
|-----------|-------|---------------------|
| **Microservices Overview** | Vista generale sistema | Request rate, error rate, latency per servizio |
| **Node.js Metrics** | Performance runtime | Event loop lag, heap usage, GC stats |
| **API Gateway** | Traffic e routing | Requests/sec, status codes, upstream latency |
| **Database** | PostgreSQL health | Connections, query duration, cache hit ratio |
| **Logs Explorer** | Ricerca logs | Log levels, errori, filtri per servizio |
| **Traces Explorer** | Distributed tracing | Span duration, service map, errori |

### Metriche Node.js da Esporre

```javascript
// Metriche automatiche (prom-client)
- process_cpu_user_seconds_total
- process_cpu_system_seconds_total
- process_resident_memory_bytes
- process_heap_bytes
- nodejs_eventloop_lag_seconds
- nodejs_active_handles_total
- nodejs_active_requests_total
- nodejs_gc_duration_seconds

// Metriche HTTP (express-prom-bundle)
- http_requests_total{method, route, status}
- http_request_duration_seconds{method, route, status}

// Metriche custom business
- orders_created_total
- products_viewed_total
- cart_items_added_total
- payment_processed_total{status}
- user_registrations_total
```

---

## 🚨 Alerting

### Canali Notifica Consigliati

| Canale | Uso | Setup |
|--------|-----|-------|
| **Email** | Alert non urgenti | SMTP config in Grafana |
| **Slack** | Alert team | Webhook URL |
| **Telegram** | Alert mobile | Bot token |
| **PagerDuty** | On-call rotation | Integration key |

### Alert Essenziali per E-commerce

| Alert | Condizione | Severity |
|-------|------------|----------|
| Servizio down | `up == 0` per 1min | Critical |
| Error rate > 5% | `error_rate > 0.05` per 5min | Warning |
| Latenza P95 > 2s | `p95_latency > 2` per 5min | Warning |
| Ordini falliti | `failed_orders > 10` per 15min | Critical |
| Database connection pool | `pool_usage > 80%` per 5min | Warning |
| Memory > 80% | `memory_usage > 0.8` per 10min | Warning |
| Disk > 85% | `disk_usage > 0.85` | Critical |

---

## 🤖 Prompt per Implementazione con AI

I seguenti prompt sono progettati per essere usati con Gemini, Claude, ChatGPT o altri LLM per implementare l'observability stack nel progetto.

---

### PROMPT 1: Setup Librerie Node.js

```
Contesto: Ho un progetto e-commerce con microservizi Node.js (Express). I servizi sono:
- api-gateway (porta 3000)
- auth-service (porta 3001)  
- product-service (porta 3002)

Uso pnpm come package manager.

Richiesta: Configura le librerie di observability per tutti i microservizi:

1. LOGGING con Pino:
   - Logger JSON strutturato
   - Livelli: trace, debug, info, warn, error, fatal
   - Campi standard: timestamp, requestId, traceId, service name
   - Pretty print in development, JSON in production
   - Request/response logging middleware per Express

2. METRICS con prom-client + express-prom-bundle:
   - Metriche default Node.js (CPU, memory, event loop, GC)
   - Metriche HTTP automatiche (request count, duration histogram)
   - Endpoint /metrics per Prometheus
   - Metriche custom per business logic (es: orders_created_total)

3. TRACING con OpenTelemetry:
   - Auto-instrumentation per Express, HTTP, PostgreSQL, Redis
   - Propagazione context tra servizi
   - Export a Tempo via OTLP
   - Correlazione con logs (traceId nei log)

Output richiesto:
- File: shared/observability/logger.js
- File: shared/observability/metrics.js
- File: shared/observability/tracing.js
- File: shared/observability/index.js (esporta tutto)
- Aggiornamento package.json con dipendenze
- Esempio di integrazione in app.js di un servizio
```

---

### PROMPT 2: Configurazione File Monitoring

```
Contesto: Devo configurare lo stack di monitoring Grafana (Prometheus + Loki + Tempo + Grafana) per il mio progetto e-commerce microservizi.

Struttura directory richiesta:
infrastructure/monitoring/
├── prometheus/
│   ├── prometheus.yml
│   └── alerts.yml
├── loki/
│   └── loki-config.yml
├── promtail/
│   └── promtail-config.yml
├── tempo/
│   └── tempo-config.yml
└── grafana/
    ├── provisioning/
    │   ├── datasources/datasources.yml
    │   └── dashboards/dashboards.yml
    └── dashboards/
        └── (dashboard JSON files)

Richiesta: Crea tutti i file di configurazione con:

1. PROMETHEUS:
   - Scrape ogni 15 secondi
   - Job per: api-gateway, auth-service, product-service
   - Regole alert per: servizio down, high error rate, high latency, high memory

2. LOKI:
   - Retention 7 giorni
   - Configurazione per ambiente single-node

3. PROMTAIL:
   - Raccolta logs da Docker containers
   - Parsing JSON (formato Pino)
   - Labels: container, service, level, traceId

4. TEMPO:
   - Receiver OTLP (gRPC + HTTP)
   - Retention 48 ore
   - Metrics generator per Prometheus

5. GRAFANA:
   - Provisioning automatico datasources (Prometheus, Loki, Tempo)
   - Correlazione tra logs, metrics e traces
   - Credenziali default: admin/admin123

Output: tutti i file YAML completi e funzionanti
```

---

### PROMPT 3: Docker Compose Monitoring

```
Contesto: Ho un file docker-compose.yml esistente per il mio e-commerce. Devo aggiungere lo stack di monitoring.

Servizi esistenti nel mio docker-compose.yml:
- api-gateway (porta 3000)
- auth-service (porta 3001)
- product-service (porta 3002)
- postgres (porta 5432)
- redis (porta 6379)
- rabbitmq (porte 5672, 15672)

Network esistente: ecommerce-network

Richiesta: Crea un file docker-compose.monitoring.yml separato con:

1. SERVIZI:
   - prometheus (porta 9090)
   - loki (porta 3100)
   - promtail (nessuna porta esposta)
   - tempo (porte 3200, 4317, 4318)
   - grafana (porta 3001 per evitare conflitto)
   - cadvisor (porta 8080) - metriche container
   - postgres-exporter (porta 9187) - metriche PostgreSQL
   - redis-exporter (porta 9121) - metriche Redis

2. CONFIGURAZIONE:
   - Tutti sulla stessa network (ecommerce-network)
   - Volumi persistenti per dati
   - Mount dei file di configurazione da infrastructure/monitoring/
   - Health checks appropriati
   - Restart policy: unless-stopped

3. DIPENDENZE:
   - promtail dipende da loki
   - grafana dipende da prometheus, loki, tempo

Output: file docker-compose.monitoring.yml completo

Nota: il file deve poter essere usato con:
docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

---

### PROMPT 4: Dashboard Grafana

```
Contesto: Ho configurato Prometheus, Loki e Tempo per monitorare i miei microservizi Node.js (Express) di un e-commerce.

Metriche disponibili:
- http_requests_total{method, route, status_code, service}
- http_request_duration_seconds{method, route, status_code, service}
- process_cpu_user_seconds_total
- process_resident_memory_bytes
- nodejs_eventloop_lag_seconds
- nodejs_active_handles_total
- nodejs_gc_duration_seconds_total

Servizi: api-gateway, auth-service, product-service

Richiesta: Crea dashboard Grafana in formato JSON per:

1. DASHBOARD "Microservices Overview":
   - Row 1: Stat panels per ogni servizio (UP/DOWN status)
   - Row 2: Request rate (req/s) per servizio - Time series
   - Row 3: Error rate (%) per servizio - Time series con soglia 5%
   - Row 4: Latency P50, P95, P99 per servizio - Time series
   - Row 5: Requests by status code - Stacked bar chart
   - Variabili: $service (multi-select), $timeRange

2. DASHBOARD "Node.js Runtime":
   - Row 1: CPU usage per servizio
   - Row 2: Memory (heap used, heap total, RSS)
   - Row 3: Event loop lag
   - Row 4: Active handles e requests
   - Row 5: Garbage collection duration e frequency

3. DASHBOARD "Logs Explorer":
   - Variabili: $service, $level, $search
   - Panel principale: Logs da Loki filtrati
   - Stat panel: conteggio per livello (info, warn, error)
   - Link a traces per log con traceId

Output: 3 file JSON validi per import in Grafana
- microservices-overview.json
- nodejs-runtime.json
- logs-explorer.json
```

---

### PROMPT 5: Alerting Completo

```
Contesto: Ho un e-commerce con microservizi monitorato con Prometheus e Grafana. Devo configurare gli alert.

Servizi: api-gateway, auth-service, product-service
Criticità business: ordini, pagamenti, login utenti

Richiesta: Configura alerting completo:

1. FILE prometheus/alerts.yml con regole per:
   
   Infrastruttura:
   - Servizio down (up == 0) per 1 minuto → Critical
   - Container restart loop (>3 restart in 15min) → Warning
   - High memory usage (>80%) per 5 minuti → Warning
   - High CPU usage (>80%) per 5 minuti → Warning
   
   Applicazione:
   - High error rate (>5% 5xx) per 5 minuti → Warning
   - Very high error rate (>20% 5xx) per 2 minuti → Critical
   - High latency P95 (>2s) per 5 minuti → Warning
   - Very high latency P95 (>5s) per 2 minuti → Critical
   
   Database:
   - PostgreSQL connections (>80% pool) → Warning
   - PostgreSQL slow queries (>1s) → Warning
   - Redis memory (>80%) → Warning
   
   Business:
   - Zero orders in 30 minuti (durante orario business) → Critical
   - Payment failures (>10% fail rate) per 10 minuti → Critical
   - Login failures spike (>20 falliti in 5 minuti) → Warning

2. CONFIGURAZIONE Grafana alerting:
   - Contact point: Slack webhook
   - Contact point: Email per critical
   - Notification policy: route per severity
   - Silences: manutenzione pianificata
   
3. TEMPLATE notifiche:
   - Messaggio Slack con: servizio, descrizione, valore attuale, link a Grafana
   - Email HTML per alert critical

Output:
- File alerts.yml aggiornato
- Istruzioni configurazione Grafana UI
- Template notifiche
```

---

### PROMPT 6: Implementazione Completa Passo-Passo

```
Contesto: Devo implementare l'observability completa nel mio progetto e-commerce Node.js. Il progetto usa:
- pnpm (package manager)
- Express.js (framework)
- Prisma (ORM)
- PostgreSQL (database)
- Redis (cache)
- RabbitMQ (message broker)
- Docker Compose (containerization)

Struttura attuale:
ecommerce-platform/
├── services/
│   ├── api-gateway/
│   ├── auth-service/
│   └── product-service/
├── shared/
├── infrastructure/
└── docker-compose.yml

Richiesta: Guidami passo-passo nell'implementazione completa.

FASE 1 - Setup librerie:
- Quali pacchetti npm installare in ogni servizio
- File da creare in shared/
- Come integrare in ogni app.js

FASE 2 - Configurazione infrastructure:
- Struttura directory infrastructure/monitoring/
- Tutti i file di configurazione YAML
- docker-compose.monitoring.yml

FASE 3 - Integrazione codice:
- Middleware logging per Express
- Endpoint /metrics
- Inizializzazione tracing
- Esempio di metric custom
- Esempio di span custom

FASE 4 - Dashboard e alerting:
- Dashboard JSON per Grafana
- Regole alert Prometheus
- Setup notifiche

FASE 5 - Testing:
- Come verificare che logs arrivino a Loki
- Come verificare che metrics siano in Prometheus
- Come verificare che traces siano in Tempo
- Come testare gli alert

Output per ogni fase:
- Comandi da eseguire
- File da creare (contenuto completo)
- File da modificare (diff/patch)
- Verifiche da fare
```

---

### PROMPT 7: Troubleshooting e Best Practices

```
Contesto: Ho implementato Prometheus, Loki, Tempo e Grafana per il mio e-commerce microservizi. Voglio una guida di troubleshooting e best practices.

Richiesta: Crea documentazione per:

1. TROUBLESHOOTING COMUNE:

   Prometheus:
   - Targets down
   - Metriche non aggiornate
   - Storage pieno
   - Query lente

   Loki:
   - Logs non arrivano
   - Errori di parsing
   - Query timeout
   - Rate limiting

   Tempo:
   - Traces mancanti
   - Span orfani
   - Correlazione non funziona

   Grafana:
   - Datasource connection failed
   - Dashboard non carica
   - Alert non triggera

2. BEST PRACTICES:

   Logging:
   - Cosa loggare e cosa no
   - Struttura log consigliata
   - Livelli appropriati
   - PII e security

   Metrics:
   - Naming conventions
   - Labels da usare
   - Cardinalità da evitare
   - Histogram vs Summary

   Tracing:
   - Quando creare span custom
   - Attributi utili
   - Sampling in produzione
   - Performance impact

3. PERFORMANCE TUNING:

   - Retention policies raccomandate
   - Sizing per volume di dati
   - Query optimization
   - Caching strategies

4. SECURITY:

   - Autenticazione Grafana
   - Network isolation
   - Secrets management
   - Audit logging

Output: Documento Markdown completo con esempi pratici
```

---

## 📋 Checklist Implementazione

```
□ FASE 1: Setup Librerie
  □ Installare pino, prom-client, @opentelemetry/* in shared/
  □ Creare shared/observability/logger.js
  □ Creare shared/observability/metrics.js
  □ Creare shared/observability/tracing.js
  □ Aggiornare package.json di ogni servizio

□ FASE 2: Configurazione Infrastructure
  □ Creare directory infrastructure/monitoring/
  □ Creare prometheus/prometheus.yml
  □ Creare prometheus/alerts.yml
  □ Creare loki/loki-config.yml
  □ Creare promtail/promtail-config.yml
  □ Creare tempo/tempo-config.yml
  □ Creare grafana/provisioning/datasources/
  □ Creare grafana/provisioning/dashboards/
  □ Creare docker-compose.monitoring.yml

□ FASE 3: Integrazione Codice
  □ Aggiungere middleware logging in ogni servizio
  □ Aggiungere endpoint /metrics in ogni servizio
  □ Inizializzare tracing prima di tutto il resto
  □ Aggiungere metriche custom business

□ FASE 4: Avvio e Verifica
  □ docker compose -f ... -f docker-compose.monitoring.yml up -d
  □ Verificare Prometheus targets (http://localhost:9090/targets)
  □ Verificare Grafana datasources (http://localhost:3001)
  □ Verificare logs in Grafana Explore (Loki)
  □ Verificare traces in Grafana Explore (Tempo)

□ FASE 5: Dashboard e Alerting
  □ Importare/creare dashboard
  □ Configurare contact points
  □ Configurare notification policies
  □ Testare alert con condizioni forzate

□ FASE 6: Documentazione
  □ Documentare runbook per alert
  □ Documentare accesso e credenziali
  □ Documentare procedure di troubleshooting
```

---

## 🔗 Risorse Utili

### Documentazione Ufficiale
- [Grafana Docs](https://grafana.com/docs/)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Loki Docs](https://grafana.com/docs/loki/)
- [Tempo Docs](https://grafana.com/docs/tempo/)
- [OpenTelemetry JS](https://opentelemetry.io/docs/instrumentation/js/)

### Tutorial e Guide
- [Grafana LGTM Stack Tutorial](https://grafana.com/docs/grafana/latest/getting-started/)
- [Node.js Observability](https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/)
- [Pino Logger](https://github.com/pinojs/pino)
- [prom-client](https://github.com/siimon/prom-client)

### Dashboard Community
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [Node.js Dashboard](https://grafana.com/grafana/dashboards/11159)
- [Docker Dashboard](https://grafana.com/grafana/dashboards/893)
- [PostgreSQL Dashboard](https://grafana.com/grafana/dashboards/9628)

---

**Documento generato per il progetto E-commerce Microservizi**
