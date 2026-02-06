# Specification - Docker Containerization & Orchestration

## Overview
This track focuses on containerizing the existing microservices (Auth Service, Product Service, and API Gateway) and orchestrating them using Docker Compose. The goal is to create a consistent, portable, and production-ready runtime environment.

## Functional Requirements

### 1. Dockerfile Creation
- **Services:** Create optimized Dockerfiles for:
    - `auth-service`
    - `product-service`
    - `api-gateway`
- **Build Strategy:** Use a **multi-stage build** process for all services to minimize image size.
    - **Stage 1 (Builder):** Install dependencies, compile TypeScript to JavaScript.
    - **Stage 2 (Production):** Copy compiled artifacts (`dist/`) and production dependencies only. Use a lightweight base image (e.g., `node:20-alpine`).
- **Configuration:** Ensure environment variables are correctly handled or injected at runtime.

### 2. Docker Compose Orchestration
- **Service Definition:** Define services for `auth-service`, `product-service`, and `api-gateway` in `docker-compose.yml`.
- **Infrastructure:** Include necessary infrastructure components (PostgreSQL, Redis, RabbitMQ) if they aren't already fully integrated into the main compose file.
- **Networking:** Configure a shared Docker network (`mystore-network`) to allow seamless communication between the Gateway and microservices.
- **Port Mapping:** Map all service ports (3000, 3001, 3002) to the host for development convenience (`3000:3000`, `3001:3001`, `3002:3002`).
    - *Note:* While all ports are exposed for dev, the architecture designates the API Gateway (port 3000) as the primary public entry point.

### 3. Environment & Configuration
- **Environment Variables:** Ensure `docker-compose.yml` passes necessary environment variables (like `DATABASE_URL`, `REDIS_URL`, service URLs) to the containers, potentially referencing the root `.env` file.

## Non-Functional Requirements
- **Efficiency:** Docker images should be as small as possible (using Alpine variants and pruning devDependencies).
- **Consistency:** The development environment started via `docker-compose up` should mirror the behavior of the local `pnpm dev` setup.

## Acceptance Criteria
- [ ] A valid `Dockerfile` exists in `services/auth-service/`, `services/product-service/`, and `services/api-gateway/`.
- [ ] Running `docker-compose up --build` successfully builds all images and starts the containers without errors.
- [ ] The API Gateway is accessible at `http://localhost:3000`.
- [ ] The Auth Service and Product Service are running and reachable by the Gateway within the Docker network.
- [ ] `docker-compose down` cleanly stops and removes the containers.

## Out of Scope
- Kubernetes manifests (handled in a separate infrastructure track).
- CI/CD pipelines for pushing images to a registry.
