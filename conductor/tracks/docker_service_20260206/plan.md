# Implementation Plan - Docker Containerization & Orchestration

## Phase 1: Dockerfile Implementation
- [x] Task: Create Dockerfile for `api-gateway`. (ce24cda)
    - [x] Implement: Multi-stage build (Builder stage: pnpm install, build; Production stage: node:20-alpine, copy dist/modules).
- [x] Task: Create Dockerfile for `auth-service`. (7f0af65)
    - [x] Implement: Multi-stage build (Builder stage: pnpm install, prisma generate, build; Production stage: node:20-alpine, copy dist/modules/prisma).
- [x] Task: Create Dockerfile for `product-service`. (6775499)
    - [x] Implement: Multi-stage build (Builder stage: pnpm install, prisma generate, build; Production stage: node:20-alpine, copy dist/modules/prisma).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Dockerfile Implementation' (Protocol in workflow.md)

## Phase 2: Docker Compose Configuration
- [ ] Task: Consolidate `docker-compose.yml`.
    - [ ] Implement: Define `api-gateway`, `auth-service`, and `product-service` in the existing `docker-compose.yml`.
    - [ ] Implement: Configure shared network `mystore-network`.
    - [ ] Implement: Map ports 3000, 3001, 3002 to the host.
    - [ ] Implement: Configure service dependencies (`depends_on` for postgres, redis, etc.).
- [ ] Task: Environment Variable Orchestration.
    - [ ] Implement: Update `docker-compose.yml` to pass variables from the root `.env`.
    - [ ] Implement: Ensure service-to-service communication uses container names (e.g., `AUTH_SERVICE_URL=http://auth-service:3001`).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Docker Compose Configuration' (Protocol in workflow.md)

## Phase 3: Final Verification & Cleanup
- [ ] Task: Integrated Container Test.
    - [ ] Write Tests: Run `docker-compose up --build` and verify all services start.
    - [ ] Verify: Execute health checks against port 3000 (Gateway) and verify it proxies to internal services.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification & Cleanup' (Protocol in workflow.md)
