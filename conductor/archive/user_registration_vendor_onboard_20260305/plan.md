# Track: User Registration Fix + Vendor Onboarding

## Obiettivo
Correggere i bug che impediscono la registrazione utenti, aggiungere la selezione del ruolo (CUSTOMER/VENDOR) durante la registrazione, e implementare un flusso di onboarding vendor in due fasi con anagrafica separata.

## Fase 1 — Bug Fix Registrazione (completata)

| # | Descrizione | File coinvolti |
|---|-------------|---------------|
| 1 | Password policy mismatch (FE min 6, BE min 8 + complessità) | `validators.ts`, `auth.validator.ts` |
| 2 | Errori backend non mostrati (data.error vs data.message) | `api.ts` |
| 3 | Login utente bannato → 500 invece di 403 | `auth.controller.ts` |
| 4 | firstName/lastName nel form ma ignorati (non nel DB) | `RegisterForm.tsx`, `validators.ts` |

## Fase 2 — Vendor Onboarding con database separato (completata)

### Architettura
- **db-utenti**: nuovo container PostgreSQL (porta host 5433) — dati anagrafici vendor
- **user-data-service**: nuovo microservizio (porta 3006 host / 3005 interno)
- Comunicazione auth↔user-data via **RabbitMQ** (pattern Saga asincrono)

### Flusso registrazione vendor
1. Vendor si registra → auth-service crea utente con `profileStatus: PENDING_PROFILE`
2. auth-service pubblica `vendor.registered` su exchange `user-events`
3. user-data-service consuma evento → crea profilo placeholder con status `PENDING`
4. Frontend reindirizza a `/vendor/complete-profile`
5. Vendor compila il form anagrafica → PUT `/api/v1/user-data/vendor/profile`
6. user-data-service aggiorna profilo a `COMPLETE` + pubblica `profile.completed` su `vendor-events`
7. auth-service consuma evento → aggiorna `profileStatus: COMPLETE` in auth_db
8. Frontend aggiorna store optimisticamente → reindirizza a `/vendor/dashboard`

### Resume flow
- Se vendor si logga con profilo incompleto → LoginForm detecta `profileStatus: PENDING_PROFILE` → redirect a `/vendor/complete-profile`
- VendorProfileGuard sulle route `/vendor/*` → impedisce accesso finché profilo non è completo

## File modificati / creati

### Shared
| File | Modifica |
|------|----------|
| `shared/messaging/types.ts` | + `USER_EVENTS`, `VENDOR_EVENTS` exchanges, + `VENDOR_REGISTERED`, `PROFILE_COMPLETED` routing keys, + `VendorRegisteredPayload`, `VendorProfileCompletedPayload` types |

### Infrastructure
| File | Modifica |
|------|----------|
| `docker-compose.yml` | + `db-utenti`, + `user-data-service`, RABBITMQ_URL su auth-service |
| `pnpm-workspace.yaml` | + `services/user-data-service` |
| `.env` | + USER_DATA_SERVICE_PORT/URL/DATABASE_URL |

### auth-service
| File | Modifica |
|------|----------|
| `prisma/schema.prisma` | + `ProfileStatus` enum + `profileStatus` field su User |
| `prisma/migrations/20260305000000_add_profile_status/` | migration SQL |
| `src/services/auth.service.ts` | `profileStatus` in user create, publish `vendor.registered`, `profileStatus` in JWT |
| `src/controllers/auth.controller.ts` | `me()` legge da DB (fresh data) |
| `src/events/vendorRegisteredPublisher.ts` | NUOVO — pubblica evento vendor.registered |
| `src/events/profileCompletedConsumer.ts` | NUOVO — consuma profile.completed → aggiorna profileStatus |
| `src/app.ts` | + init RabbitMQ publisher + consumer |
| `Dockerfile` | + COPY user-data-service/package.json |

### user-data-service (nuovo)
| File | Descrizione |
|------|-------------|
| `package.json` | dipendenze |
| `tsconfig.json` | TypeScript config |
| `vitest.config.ts` | test config |
| `Dockerfile` | build multi-stage |
| `prisma/schema.prisma` | modello VendorProfile con status PENDING/COMPLETE |
| `prisma/migrations/20260305000001_init_vendor_profiles/` | migration SQL |
| `src/app.ts` | app Express + init RabbitMQ |
| `src/config/db.ts` | Prisma client |
| `src/middleware/auth.middleware.ts` | JWT validation |
| `src/middleware/role.middleware.ts` | role authorization |
| `src/validators/vendorProfile.validator.ts` | express-validator |
| `src/controllers/vendorProfile.controller.ts` | GET + PUT profile |
| `src/services/vendorProfile.service.ts` | business logic |
| `src/routes/index.ts` | GET/PUT /vendor/profile |
| `src/events/vendorRegisteredConsumer.ts` | consuma vendor.registered → crea placeholder |
| `src/events/profileCompletedPublisher.ts` | pubblica profile.completed |
| `src/tests/vendorProfile.test.ts` | 6 unit test (100% pass) |

### api-gateway
| File | Modifica |
|------|----------|
| `src/routes/user-data.routes.ts` | NUOVO — proxy → user-data-service |
| `src/routes/index.ts` | + `/api/v1/user-data` route |
| `Dockerfile` | + COPY user-data-service/package.json |

### Frontend
| File | Modifica |
|------|----------|
| `src/stores/authStore.ts` | + `profileStatus` in User, + `setProfileStatus()` action |
| `src/services/auth.service.ts` | + `profileStatus` in interfaces, + `getCurrentUser()` |
| `src/services/vendorProfile.service.ts` | NUOVO — GET/PUT /user-data/vendor/profile |
| `src/components/features/auth/LoginForm.tsx` | redirect VENDOR PENDING_PROFILE → /vendor/complete-profile |
| `src/components/features/auth/RegisterForm.tsx` | redirect VENDOR PENDING_PROFILE → /vendor/complete-profile |
| `src/pages/Vendor/CompleteProfile/index.tsx` | NUOVO — form anagrafica completo |
| `src/routes/index.tsx` | + `/vendor/complete-profile` route + VendorProfileGuard |

## Stato

- [x] Conductor track creato
- [x] Backend fixes + role param (Fase 1)
- [x] Docker rebuild auth-service (Fase 1)
- [x] Frontend fixes (Fase 1)
- [x] TypeScript check (Fase 1)
- [x] Shared package: nuovi tipi/costanti RabbitMQ
- [x] Infrastructure: db-utenti + user-data-service in docker-compose
- [x] auth-service Prisma: ProfileStatus migration applicata
- [x] auth-service: RabbitMQ publisher + consumer
- [x] user-data-service: creato da zero (service + Prisma + events + tests)
- [x] api-gateway: route user-data aggiunta
- [x] Frontend: authStore + guard + CompleteProfile page
- [x] Docker build: tutti e 3 i container rebuilt e running
- [x] TypeScript check: auth-service, user-data-service, frontend — tutti clean
- [x] Unit tests user-data-service: 6/6 passing
