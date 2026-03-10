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

- [x] **Track: Shop Page Service - Vendor HTML pages with MinIO storage and RabbitMQ integration**
  *Link: [./archive/shop_page_service_20260213/](./archive/shop_page_service_20260213/)*

- [x] **Track: Fix current application - API path mismatch, auth data contract misalignment, and test configuration**
  *Commit: `8176c6d` | Link: [./archive/fix_current_application_20260213/](./archive/fix_current_application_20260213/)*

- [x] **Track: Shop Page Frontend V1 - Vendor page management with 3-column layout, DnD sidebar, HTML editor with preview, Site Builder, bug fixes, Preview Draft/Publish buttons**
  *Link: [./archive/shop_page_frontend_v1_20260216/](./archive/shop_page_frontend_v1_20260216/)*

- [x] **Track: Digital Products (downloadable files, license keys, access/subscriptions) & fixed Product Bundles with mixed physical+digital support**
  *Link: [./archive/digital_products_bundles_20260223/](./archive/digital_products_bundles_20260223/)*

- [x] **Track: Order Service + Vendor Dashboard - Order microservice with checkout integration, vendor sales stats API, dashboard with sales chart, and bundle integration in products page**
  *Link: [./archive/order_service_vendor_dashboard_20260224/](./archive/order_service_vendor_dashboard_20260224/)*

- [x] **Track: Cache Redis Prodotti - Cache-aside pattern per categorie con Redis DB 1, TTL dinamico alle 03:30 AM, graceful fallback + Admin Dashboard con sidebar, CRUD categorie, BarChart ordini**
  *Link: [./archive/redis_cache_categories_20260226/](./archive/redis_cache_categories_20260226/)*

---

- [x] **Track: Admin Panel - Dashboard, Gestione Categorie, Gestione Utenti (IP tracking, vendor sales stats, ricerca email, filtro multi-ruolo)**
  *Link: [./archive/admin_panel_20260301/](./archive/admin_panel_20260301/)*

---

- [x] **Track: User Registration Fix + Vendor Onboarding — fix bug registrazione + selezione ruolo + flusso anagrafica vendor in due fasi con db-utenti + user-data-service + RabbitMQ Saga**
  *Link: [./archive/user_registration_vendor_onboard_20260305/](./archive/user_registration_vendor_onboard_20260305/)*

---

- [x] **Track: OTP Email Verification + Vendor UX improvements + K8s Deploy — verifica email OTP alla registrazione, sidebar vendor completa, check email duplicata, home SVG logo, configurazione Kubernetes**
  *Link: [./archive/otp_email_vendor_ux_k8s_20260307/](./archive/otp_email_vendor_ux_k8s_20260307/)*

---

## Active Tracks

- [ ] **Track: User Onboard**
  *Link: [./tracks/user_onboard_20260309/](./tracks/user_onboard_20260309/)*

---