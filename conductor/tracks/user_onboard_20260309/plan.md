# Track: User Onboard — Stripe Identity

## Obiettivo
Aggiungere la verifica dell'identità del vendor tramite Stripe Identity come step obbligatorio del processo di onboarding. Il vendor deve completare prima il form anagrafico e poi verificare la propria identità prima di poter accedere alla dashboard.

## Flusso implementato

```
1. Register → profileStatus = PENDING_PROFILE
2. Fill /vendor/complete-profile → VendorProfile COMPLETE
   → profile.completed event → auth-service → profileStatus = PENDING_IDENTITY (NUOVO)
3. Redirect a /vendor/verify-identity
   → Frontend chiama POST /user-data/vendor/identity/session → { clientSecret }
   → stripe.verifyIdentity(clientSecret) apre modal Stripe
4. Stripe webhook → user-data-service → identityStatus = VERIFIED
   → identity.verified event → auth-service → profileStatus = COMPLETE
5. Vendor accede alla dashboard
```

## Modifiche

### Shared
| File | Modifica |
|------|----------|
| `shared/messaging/types.ts` | + `IDENTITY_VERIFIED` routing key, + `AUTH_IDENTITY_VERIFIED` queue, + `VendorIdentityVerifiedPayload` |

### auth-service
| File | Modifica |
|------|----------|
| `prisma/schema.prisma` | + `PENDING_IDENTITY` a enum `ProfileStatus` |
| `prisma/migrations/20260310000000_add_pending_identity/` | migration SQL |
| `src/events/profileCompletedConsumer.ts` | ora setta `PENDING_IDENTITY` (non `COMPLETE`) |
| `src/events/identityVerifiedConsumer.ts` | NUOVO — consuma `identity.verified` → setta `COMPLETE` |
| `src/app.ts` | + init `identityVerifiedConsumer` |

### user-data-service
| File | Modifica |
|------|----------|
| `package.json` | + `stripe` |
| `prisma/schema.prisma` | + enum `IdentityStatus`, + `identityStatus`, `stripeVerificationSessionId` su VendorProfile |
| `prisma/migrations/20260310000001_add_identity_status/` | migration SQL |
| `src/config/stripe.ts` | NUOVO — lazy Stripe singleton |
| `src/services/stripeIdentity.service.ts` | NUOVO — createVerificationSession + handleWebhookEvent |
| `src/events/identityVerifiedPublisher.ts` | NUOVO — pubblica `identity.verified` |
| `src/controllers/stripeIdentity.controller.ts` | NUOVO — POST /vendor/identity/session + POST /stripe/webhook |
| `src/routes/index.ts` | + nuove route identità |
| `src/app.ts` | + init publisher + middleware raw body per webhook |

### docker-compose.yml
| File | Modifica |
|------|----------|
| `docker-compose.yml` | + `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_IDENTITY_FLUX_ID` a user-data-service |

### Frontend
| File | Modifica |
|------|----------|
| `package.json` | + `@stripe/stripe-js` |
| `src/stores/authStore.ts` | + `PENDING_IDENTITY` al tipo `ProfileStatus` |
| `src/services/stripeIdentity.service.ts` | NUOVO — createSession() |
| `src/pages/Vendor/VerifyIdentity/index.tsx` | NUOVO — pagina verifica con modal Stripe |
| `src/pages/Vendor/index.tsx` (VendorLayout) | + guard PENDING_IDENTITY → /vendor/verify-identity |
| `src/pages/Vendor/CompleteProfile/index.tsx` | dopo submit → /vendor/verify-identity |
| `src/routes/index.tsx` | + route `/vendor/verify-identity` |
| `.env` | + `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY` |

## Stato

- [x] shared: nuovi tipi e costanti RabbitMQ
- [x] auth-service: migration + consumer + rebuild Docker
- [x] user-data-service: migration + Stripe service + controller + rebuild Docker
- [x] docker-compose.yml: env Stripe aggiunti
- [x] Frontend: pagina VerifyIdentity + guard + route + TypeScript clean
- [x] Cancellazione utente admin: DELETE /admin/users/:id + evento user.deleted + consumer user-data + consumer product
- [x] Admin vendor profile endpoints: GET /admin/vendor-profile/:userId + PUT /admin/vendor-profile/:userId/identity-status (pubblica identity.verified se VERIFIED)
- [x] Frontend admin: dialog dettaglio utente con anagrafica vendor + gestione identityStatus + i18n (it + en)

## Note configurazione
- Aggiungere `STRIPE_WEBHOOK_SECRET` (ottenibile da `stripe listen --print-secret`)
- Aggiungere `VITE_STRIPE_PUBLISHABLE_KEY` (chiave pubblica `pk_...`) al `.env`
- In sviluppo: `stripe listen --forward-to localhost:3000/api/v1/user-data/stripe/webhook`
