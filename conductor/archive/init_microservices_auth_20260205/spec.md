# Specification: Microservices Foundation & Auth Service

## 1. Overview
This track focuses on establishing the core infrastructure for the ecommerce platform's microservices architecture. It includes setting up the API Gateway to route requests, initializing the Auth Service to handle user identity, and implementing Role-Based Access Control (RBAC) to secure the platform. This foundation is critical for all subsequent services and features.

## 2. Goals
- **Infrastructure Setup:** Initialize the Docker-based microservices environment with a shared network.
- **API Gateway:** Implement a centralized entry point for all client requests.
- **Authentication:** Create a dedicated Auth Service for user registration, login, and token management.
- **Authorization:** Implement RBAC to distinguish between End Customers, Store Administrators, Support Staff, and Vendors.
- **Data Persistence:** Set up the PostgreSQL database for the Auth Service and Redis for session/token management.

## 3. User Stories
- **As a System:** I need a central gateway to route requests to the correct microservice so that the architecture remains decoupled.
- **As a User (All Roles):** I want to register a new account so that I can access the platform.
- **As a User (All Roles):** I want to log in using my credentials so that I can securely access my data.
- **As an Admin:** I want to assign specific roles to users so that they have the correct permissions (RBAC).
- **As a Developer:** I need a standardized way to validate authentication tokens across services.

## 4. Technical Requirements
- **Runtime:** Node.js with TypeScript.
- **API Gateway:** Express.js acting as a reverse proxy.
- **Auth Service:** Express.js service handling `/auth` routes.
- **Database:** PostgreSQL for storing user data (credentials, profiles, roles).
- **Caching:** Redis for storing refresh tokens or session data.
- **Communication:** HTTP/REST for synchronous gateway-to-service communication; RabbitMQ setup (basic connectivity) for future async events.
- **Security:**
    - JWT (JSON Web Tokens) for stateless authentication.
    - Argon2 or bcrypt for password hashing.
    - Environment variables for sensitive configuration (DB credentials, secrets).

## 5. API Design (Draft)
- **API Gateway Routes:**
    - `POST /api/v1/auth/register` -> Proxies to Auth Service
    - `POST /api/v1/auth/login` -> Proxies to Auth Service
    - `POST /api/v1/auth/refresh` -> Proxies to Auth Service
    - `GET /api/v1/auth/me` -> Proxies to Auth Service

- **Auth Service Endpoints:**
    - `POST /register`: Create a new user.
    - `POST /login`: Authenticate credentials and return Access/Refresh tokens.
    - `POST /refresh`: Issue new Access token using Refresh token.
    - `GET /me`: Return current user profile based on token.
