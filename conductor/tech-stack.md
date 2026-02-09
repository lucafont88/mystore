# Technology Stack

## Backend (Microservices)
- **Runtime:** Node.js
- **Language:** TypeScript (ESM for shared, CommonJS for services)
- **Framework:** Express.js (inferred standard for Node microservices)

## Frontend
- **Framework:** React
- **Language:** TypeScript
- **State Management:** Zustand (with typed slices and actions)
- **Styling:** Tailwind CSS

## Data Persistence & Caching
- **Primary Database:** PostgreSQL
- **Caching & Sessions:** Redis

## Infrastructure & Messaging
- **Message Broker:** RabbitMQ
- **Containerization:** Docker
- **Orchestration:**
    - **Development:** Docker Compose
    - **Staging/Mid-Scale:** Docker Swarm
    - **Production:** Kubernetes

## Observability (LGTM Stack)
- **Logging:** Pino (structured JSON, TypeScript), Loki, Promtail
- **Metrics:** OpenTelemetry Metrics SDK (TypeScript), Prometheus
- **Tracing:** OpenTelemetry (OTel SDK, TypeScript), Tempo
- **Visualization:** Grafana (correlated Trace-Log-Metrics)
- **Collector:** OpenTelemetry Collector (centralized, persistent queues)

## Architecture
- **Pattern:** Microservices
- **Communication:** Asynchronous messaging via RabbitMQ
