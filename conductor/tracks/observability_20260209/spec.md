# Specification: Full Observability Stack Implementation (LGTM)

## 1. Overview
Implement a comprehensive observability stack (LGTM: Loki, Grafana, Tempo, Prometheus) for the e-commerce microservices architecture. This initiative aims to provide centralized logging, real-time metrics, and distributed tracing across all services (API Gateway, Auth Service, Product Service) to ensure system reliability, performance monitoring, and rapid incident response.

## 2. Goals
- **Centralized Logging:** Aggregate structured JSON logs from all services using Pino, Promtail, and Loki.
- **Metrics & Alerting:** Collect system and business metrics via Prometheus and visualize them in Grafana with configured alerts.
- **Distributed Tracing:** Implement end-to-end request tracing using OpenTelemetry and Tempo to diagnose latency and dependency issues.
- **Standardization:** Create a reusable `@ecommerce/shared/observability` module to ensure consistent instrumentation across all Node.js services.
- **Dashboarding:** Provide pre-configured Grafana dashboards for immediate visibility into microservice health and performance.

## 3. Technical Requirements

### 3.1 Shared Observability Module (`@ecommerce/shared`)
A new module `shared/observability` must be created with the following components:
- **Logger (`logger.js`):** Pino-based logger with JSON output, standard fields (traceId, spanId, service), and pretty-print in dev.
- **Metrics (`metrics.js`):** `prom-client` wrapper for default Node.js metrics and custom HTTP metrics (`http_requests_total`, `http_request_duration_seconds`, `http_requests_in_progress`). Includes endpoint handler for `/metrics`.
- **Tracing (`tracing.js`):** OpenTelemetry SDK setup with auto-instrumentation (Express, HTTP, PG, Redis, AMQP) and OTLP exporter to Tempo.
- **Middlewares:**
    - `requestLogger.js`: Logs incoming requests/responses and propagates `X-Request-ID`.
    - `metricsMiddleware.js`: Tracks request counts and duration, ensuring route normalization.
- **Exports:** Unified `initObservability(serviceName)` function.

### 3.2 Infrastructure & Configuration
Setup `infrastructure/monitoring` with configuration files for:
- **Prometheus:** Scrape jobs for all services (15s interval). Alerts for ServiceDown, HighErrorRate (>5%), HighLatency (P95 > 1s), HighMemory (>80%).
- **Loki:** Single node, filesystem storage, 7-day retention.
- **Promtail:** Docker SD config, JSON parsing pipeline, labels (container, service, traceId).
- **Tempo:** OTLP receivers, local storage, 48h retention.
- **Grafana:** Datasources provisioning (Prometheus, Loki, Tempo with trace-to-logs links) and Dashboard provisioning.

### 3.3 Container Orchestration
- **`docker-compose.monitoring.yml`:** Define services for Prometheus, Loki, Promtail, Tempo, Grafana (port 3001), and optional exporters (Postgres, Redis, cAdvisor).
- **Integration:** Must attach to the external `ecommerce-network`.

### 3.4 Service Integration
Update `api-gateway`, `auth-service`, and `product-service` to:
- Depend on `@ecommerce/shared`.
- Initialize observability (`initObservability`) as the *first* import.
- Apply request and metrics middlewares.
- Expose `/metrics` and `/health` endpoints.

### 3.5 Visualization
- **Microservices Overview Dashboard:** Panels for Up/Down status, RPS, Error Rate, Latency Heatmap, and Slowest Endpoints.
- **Node.js Metrics Dashboard:** CPU, Memory (Heap/RSS), Event Loop Lag, GC.
- **Logs Explorer:** Integrated logs panel with filters and trace linking.

## 4. Out of Scope
- Production deployment configuration (Kubernetes/Helm charts) - focus is on Docker Compose for this track.
- Advanced alerting notification channels (Slack/PagerDuty) - local Grafana alerting only.

## 5. Success Criteria
- All containers (infrastructure + services) start healthy via `npm run monitoring:up`.
- Grafana is accessible at `http://localhost:3001`.
- Logs from all services appear in Loki/Grafana with correlated Trace IDs.
- Traces are visible in Tempo for requests passing through Gateway -> Service -> DB.
- Prometheus targets show all services as UP.
- Dashboards populate with real-time data.
