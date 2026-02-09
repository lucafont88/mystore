# Technology Stack

## Backend (Microservices)
- **Runtime:** Node.js
- **Language:** TypeScript
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
- **Logging:** Pino (structured JSON), Loki, Promtail
- **Metrics:** prom-client (Node.js), Prometheus
- **Tracing:** OpenTelemetry (OTel SDK), Tempo
- **Visualization:** Grafana

## Architecture
- **Pattern:** Microservices
- **Communication:** Asynchronous messaging via RabbitMQ
