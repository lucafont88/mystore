# Implementation Plan - Microservices Foundation & Auth Service

## Phase 1: Infrastructure & Environment Setup
- [x] Task: Initialize Project Structure & Docker Environment
    - [x] Initialize the root project with a `docker-compose.yml` defining the network, PostgreSQL, Redis, and RabbitMQ services.
    - [x] Create the directory structure for `services/api-gateway` and `services/auth-service`.
    - [x] Configure shared TypeScript configuration (`tsconfig.base.json`) and ESLint/Prettier settings in the root.
- [x] Task: Database & Message Broker Configuration
    - [x] Verify local Docker environment is running PostgreSQL, Redis, and RabbitMQ.
    - [x] Create a `Makefile` or helper scripts to start/stop the infrastructure.

## Phase 2: API Gateway Implementation
- [x] Task: Scaffolding API Gateway
    - [x] Initialize `services/api-gateway` with `package.json` and basic Express server.
    - [x] Create a "Health Check" endpoint (`/health`) to verify the gateway is running.
    - [x] Implement `express-http-proxy` or similar middleware to forward requests.
- [x] Task: Gateway Routing Logic
    - [x] Define the routing strategy for `/api/v1/auth/*` requests.
    - [x] Add basic logging (e.g., `morgan`) to track incoming requests.

## Phase 3: Auth Service - Core & Database
- [x] Task: Scaffolding Auth Service
    - [x] Initialize `services/auth-service` with `package.json`, Express, and TypeScript.
    - [x] Configure `dotenv` to load database credentials.
- [~] Task: Database Schema & Migration (PostgreSQL)
    - [ ] Design the `User` table (id, email, password_hash, role, created_at).
    - [ ] Design the `Role` enum or table if dynamic roles are needed (start with Enum: CUSTOMER, ADMIN, SUPPORT, VENDOR).
    - [ ] Set up an ORM (e.g., Prisma or TypeORM) and run the initial migration.
- [ ] Task: Redis Connection
    - [ ] Implement a Redis client module in the Auth Service for token management.

## Phase 4: Auth Service - Registration & Login
- [ ] Task: User Registration Feature
    - [ ] Write Tests: Create unit tests for user registration logic (input validation, duplicate email check).
    - [ ] Implement: Create the `register` controller and service method.
    - [ ] Implement: Hash passwords using `argon2` or `bcrypt`.
    - [ ] Implement: Save user to PostgreSQL.
- [ ] Task: User Login Feature
    - [ ] Write Tests: Create unit tests for login logic (credential verification, token generation).
    - [ ] Implement: Verify email and password.
    - [ ] Implement: Generate JWT Access Token and Refresh Token.
    - [ ] Implement: Store Refresh Token in Redis (whitelist approach) or return as HTTP-only cookie.

## Phase 5: Auth Service - Security & RBAC
- [ ] Task: Token Verification Middleware
    - [ ] Implement a shared middleware (or library) to verify JWTs.
    - [ ] Write Tests: Ensure invalid or expired tokens are rejected.
- [ ] Task: Role-Based Access Control (RBAC)
    - [ ] Implement a middleware/guard to check `user.role` against required permissions.
    - [ ] Write Tests: Verify that a CUSTOMER cannot access ADMIN routes.
- [ ] Task: Connect Gateway to Auth Service
    - [ ] Update API Gateway to route real traffic to the now-running Auth Service.
    - [ ] Verify the full flow: Client -> Gateway -> Auth Service -> DB.

## Phase 6: Final Verification
- [ ] Task: Integrated System Test
    - [ ] Run the full `docker-compose` stack.
    - [ ] Perform a manual end-to-end test: Register a user, Login, and access a protected route (mocked if necessary).
