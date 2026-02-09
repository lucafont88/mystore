# Implementation Plan - Full Observability Stack (LGTM)

## Phase 1: Shared Observability Module Implementation [checkpoint: c87133c]
- [x] Task: Initialize Shared Observability Structure f112e24
    - [x] Create directory structure `shared/observability` and subdirectories (`middlewares`).
    - [x] Update `shared/package.json` with required dependencies (`pino`, `prom-client`, `@opentelemetry/api`, etc.).
- [x] Task: Implement Tracing & Logging Core f111965
    - [x] Write Tests: Create unit tests for Logger formatting and context injection.
    - [x] Implement: `tracing.js` with OpenTelemetry SDK, OTLP exporter, and auto-instrumentations.
    - [x] Implement: `logger.js` using Pino, configured to include Trace IDs from OpenTelemetry context.
- [x] Task: Implement Metrics Core 1eea2ea
    - [x] Write Tests: Create unit tests for metric creation and registry.
    - [x] Implement: `metrics.js` using `prom-client` (Default metrics + Custom HTTP histogram/counters).
- [x] Task: Implement Express Middlewares 85d7936
    - [x] Write Tests: Create unit/integration tests for `requestLogger` and `metricsMiddleware` using a mock Express app.
    - [x] Implement: `middlewares/requestLogger.js` (Request/Response logging, X-Request-ID).
    - [x] Implement: `middlewares/metricsMiddleware.js` (Route normalization, duration tracking).
- [x] Task: Unified Export & Build 9181a83
    - [x] Implement: `index.js` exporting `initObservability` and individual components.
    - [x] Verify: Ensure the package builds/lints correctly within the pnpm workspace.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Shared Observability Module Implementation' (Protocol in workflow.md)

## Phase 2: Infrastructure Configuration & Docker Compose [checkpoint: 125a76a]
- [x] Task: Configure Prometheus & Alerting e195a6f
    - [x] Implement: `infrastructure/monitoring/prometheus/prometheus.yml` (Scrape jobs).
    - [x] Implement: `infrastructure/monitoring/prometheus/alerts.yml` (ServiceDown, HighErrorRate, HighLatency).
- [x] Task: Configure Logging (Loki & Promtail) af04a99
    - [x] Implement: `infrastructure/monitoring/loki/loki-config.yml` (Retention, Storage).
    - [x] Implement: `infrastructure/monitoring/promtail/promtail-config.yml` (Docker SD, JSON pipeline).
- [x] Task: Configure Tracing (Tempo) a76ab0f
    - [x] Implement: `infrastructure/monitoring/tempo/tempo-config.yml` (OTLP receivers).
- [x] Task: Configure Grafana Provisioning 3797682
    - [x] Implement: `infrastructure/monitoring/grafana/provisioning/datasources/datasources.yml` (Prometheus, Loki, Tempo).
    - [x] Implement: `infrastructure/monitoring/grafana/provisioning/dashboards/dashboards.yml`.
    - [x] Implement: `infrastructure/monitoring/grafana/dashboards/microservices-overview.json`.
- [x] Task: Docker Compose Orchestration 404b955
    - [x] Implement: `docker-compose.monitoring.yml` with all services and network configuration.
    - [x] Implement: Add `monitoring` scripts to root `package.json`.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Infrastructure Configuration & Docker Compose' (Protocol in workflow.md)

## Phase 3: Service Integration
- [x] Task: Integrate Observability into API Gateway 57a2960
    - [x] Update `services/api-gateway/package.json` to depend on `@ecommerce/shared`.
    - [x] Update `services/api-gateway/src/app.ts` (or .js) to initialize observability first.
    - [x] Implement: `/metrics` and `/health` endpoints.
    - [x] Verify: Manual check via `curl localhost:3000/metrics`.
- [x] Task: Integrate Observability into Auth Service f9494a2
    - [x] Update `services/auth-service/package.json`.
    - [x] Update `services/auth-service/src/app.ts` to initialize observability.
    - [x] Implement: `/metrics` and `/health` endpoints.
- [x] Task: Integrate Observability into Product Service 391d739
    - [x] Update `services/product-service/package.json`.
    - [x] Update `services/product-service/src/app.ts` to initialize observability.
    - [x] Implement: `/metrics` and `/health` endpoints.
- [~] Task: Conductor - User Manual Verification 'Phase 3: Service Integration' (Protocol in workflow.md)

## Phase 4: Final Validation & Dashboards
- [ ] Task: Final End-to-End Verification
    - [ ] Write Tests: Create a script or manual procedure to generate traffic (success/fail) across all services.
    - [ ] Verify: Check Grafana (`http://localhost:3001`) for data flow in "Microservices Overview".
    - [ ] Verify: Confirm Alerts fire (e.g., stop a container to trigger ServiceDown).
    - [ ] Verify: Trace a request from Gateway -> Auth -> DB in Tempo.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Validation & Dashboards' (Protocol in workflow.md)
