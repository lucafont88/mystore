# Implementation Plan - High-Reliability Observability Collector (OTel)

## Phase 1: Shared Package Observability SDK (TypeScript)
- [x] Task: Configure Shared Package Environment b1d3efa
    - [x] Update `shared/package.json` with OTel and Pino dependencies.
    - [x] Update `shared/tsconfig.json` for ES2022 and strict typing.
- [x] Task: Implement Tracing Core (`tracing.ts`) bf6a1e0
    - [x] Write Tests: Verify span creation and context propagation.
    - [x] Implement: `NodeSDK` with `BatchSpanProcessor` (maxQueueSize: 2048) and auto-instrumentation.
- [x] Task: Implement Metrics Core (`metrics.ts`) 4f679c1
    - [x] Write Tests: Verify HTTP metric counters and histogram buckets.
    - [x] Implement: `MeterProvider` with `PeriodicExportingMetricReader` (60s interval).
- [x] Task: Implement Correlated Logging (`logger.ts`) a90cc5f
    - [x] Write Tests: Ensure `traceId` and `spanId` are automatically injected into Pino JSON output.
    - [x] Implement: Pino logger with custom OTel formatter and pretty-print dev mode.
- [x] Task: Implement Express Middlewares 6508a58
    - [x] Write Tests: Verify `X-Request-ID` generation and metric increments using Supertest.
    - [x] Implement: `requestLogger.middleware.ts` and `metrics.middleware.ts`.
- [x] Task: SDK Initialization & Entry Point bb911de
    - [x] Implement: `init.ts` (orchestrating startup order) and `index.ts` (consolidated exports).
- [~] Task: Conductor - User Manual Verification 'Phase 1: Shared Package Observability SDK' (Protocol in workflow.md)

## Phase 2: Infrastructure & Collector Setup
- [ ] Task: Configure OpenTelemetry Collector
    - [ ] Implement: `otel-collector-config.yaml` with `file_storage` extension and persistent `sending_queue`.
- [ ] Task: Configure Backend Storage & Alerts
    - [ ] Implement: `prometheus.yml` (Remote Write) and `alerts.yml` (Collector health rules).
    - [ ] Implement: `loki-config.yml` and `tempo-config.yml` for local persistent storage.
- [ ] Task: Configure Grafana Provisioning
    - [ ] Implement: `datasources.yml` with Trace-to-Log and Trace-to-Metrics linking.
- [ ] Task: Docker Compose Orchestration
    - [ ] Implement: `docker-compose.monitoring.yml` with persistent volumes (`otel_storage`, etc.).
    - [ ] Update: Root `package.json` with monitoring lifecycle scripts.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Infrastructure & Collector Setup' (Protocol in workflow.md)

## Phase 3: Service Integration & Resilience Validation
- [ ] Task: Integrate API Gateway
    - [ ] Update: `app.ts` to initialize observability as the first execution step.
    - [ ] Implement: Graceful shutdown logic to flush OTel buffers.
- [ ] Task: Integrate Auth and Product Services
    - [ ] Apply the same initialization and middleware patterns to both services.
- [ ] Task: End-to-End Resilience Test
    - [ ] Write Tests: Verify that telemetry is buffered and successfully delivered after a 60s Collector restart.
    - [ ] Verify: Confirm distributed traces capture RabbitMQ and Prisma (PG) spans.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Service Integration & Resilience Validation' (Protocol in workflow.md)
