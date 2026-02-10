# Specification: High-Reliability Observability Collector (OTel)

## 1. Overview
Implement a centralized observability architecture using the **OpenTelemetry Collector** as the core component. This track refactors the current observability implementation to use a unified OTLP pipeline for logs, metrics, and traces, ensuring **zero data loss** through persistent local storage, retries, and batch processing.

## 2. Goals
- **Centralized Collection:** Move from direct service-to-backend communication to a Collector-mediated architecture.
- **High Reliability:** Implement disk-persistent queues (`file_storage`) and exponential backoff retries to survive collector restarts and backend outages.
- **Unified TypeScript SDK:** Create a robust `@ecommerce/shared/observability` module providing typed wrappers for Pino (Logging), OTel Metrics, and OTel Tracing.
- **Backend Optimization:** Use OTel Collector to batch and filter data before exporting to Loki, Prometheus, and Tempo.
- **Enhanced Visibility:** Configure Grafana with correlated data sources (Trace -> Log -> Metrics links).

## 3. Technical Requirements

### 3.1 Shared TypeScript Module
- **Logger:** Pino with JSON output, auto-injecting `traceId`/`spanId` from active OTel context.
- **Metrics:** `MeterProvider` with OTLP export. Standard HTTP metrics (Counter, Histogram, UpDownCounter).
- **Tracing:** `NodeSDK` with auto-instrumentation for Express, HTTP, PG (Prisma), Redis, and RabbitMQ.
- **Reliability:** Mandatory `BatchSpanProcessor` and `PeriodicExportingMetricReader` with specific timeouts/queue sizes.

### 3.2 Infrastructure (Collector & Backends)
- **OTel Collector:** 
    - Receivers: OTLP (gRPC/HTTP).
    - Processors: `memory_limiter` (512MiB limit), `batch` (5s timeout).
    - Exporters: `prometheusremotewrite`, `loki`, `otlp/tempo`.
    - **Persistence:** Use `file_storage` extension mapped to a Docker volume for persistent queues.
- **Prometheus:** Configured for `remote_write` and alerting on Collector health/queue size.
- **Loki/Tempo:** Configured to receive data from the Collector.

### 3.3 Orchestration
- **Docker Compose:** Dedicated `docker-compose.monitoring.yml` with health checks and persistent volumes.
- **Service Integration:** Update `api-gateway`, `auth-service`, and `product-service` to initialize the OTel SDK as the first execution step.

## 4. Acceptance Criteria
- [ ] No telemetry data is lost after a simulated 1-minute OTel Collector restart.
- [ ] Logs in Grafana automatically include clickable Trace IDs.
- [ ] Metrics for request duration and count are visible in Prometheus/Grafana via OTLP.
- [ ] Traces correctly capture Prisma (PG) and Redis operations.
- [ ] `pnpm build` in the shared package generates valid `.d.ts` and `.js` files.
- [ ] All services pass health checks and report status correctly to the Collector.
