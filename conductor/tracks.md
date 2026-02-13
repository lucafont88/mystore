# Project Tracks

This file tracks all major tracks for the project. Each track has its own detailed plan in its respective folder.

---

## Archived Tracks

- [x] **Track: Initialize the microservices architecture, setup the API Gateway, and implement the Auth Service to support user registration and login with Role-Based Access Control (RBAC).**
  *Link: [./archive/init_microservices_auth_20260205/](./archive/init_microservices_auth_20260205/)*

- [x] **Track: Implement the Product Service to manage categories and products for vendors and admins, including public search and catalog browsing through the API Gateway.**
  *Link: [./archive/product_service_20260206/](./archive/product_service_20260206/)*

- [x] **Track: Containerize the microservices (Auth, Product, API Gateway) using multi-stage Dockerfiles and orchestrate the entire stack with Docker Compose.**
  *Link: [./archive/docker_service_20260206/](./archive/docker_service_20260206/)*

- [x] **Track: Implement a comprehensive observability stack (LGTM: Loki, Grafana, Tempo, Prometheus) for the e-commerce microservices architecture.**
  *Link: [./archive/observability_20260209/](./archive/observability_20260209/)*

- [x] **Track: Refactor the observability module in @ecommerce/shared from JavaScript to native TypeScript with strong typing and consolidated exports.**
  *Link: [./archive/observability_ts_refactor_20260209/](./archive/observability_ts_refactor_20260209/)*

- [x] **Track: Implement a high-reliability OpenTelemetry Collector architecture to centralize telemetry (logs, metrics, traces) with persistent buffering.**
  *Link: [./archive/observability_collector_20260209/](./archive/observability_collector_20260209/)*

- [x] **Track: Migrate the entire testing framework of the workspace (all microservices and shared packages) from Jest to Vitest.**
  *Link: [./archive/jest_to_vitest_migration_20260209/](./archive/jest_to_vitest_migration_20260209/)*

- [x] **Track: Frontend for Auth and Products using Vite, React, and Indigo/Blue theme**
  *Link: [./archive/frontend_auth_products_20260210/](./archive/frontend_auth_products_20260210/)*

---

## Active Tracks

- [ ] **Track: Shop Page Service - Vendor HTML pages with MinIO storage and RabbitMQ integration**
  *Link: [./tracks/shop_page_service_20260213/](./tracks/shop_page_service_20260213/)*

---

## Recently Completed

- [x] **Track: Fix current application - API path mismatch, auth data contract misalignment, and test configuration**
  *Commit: `8176c6d` | Link: [./archive/fix_current_application_20260213/](./archive/fix_current_application_20260213/)*