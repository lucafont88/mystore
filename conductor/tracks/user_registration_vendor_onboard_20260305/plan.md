# Track: User Registration Fix + Vendor Onboarding

## Obiettivo
Correggere i bug che impediscono la registrazione utenti e aggiungere la selezione del ruolo (CUSTOMER/VENDOR) durante la registrazione.

## Bug identificati

| # | Descrizione | File coinvolti |
|---|-------------|---------------|
| 1 | Password policy mismatch (FE min 6, BE min 8 + complessità) | `validators.ts`, `auth.validator.ts` |
| 2 | Errori backend non mostrati (data.error vs data.message) | `api.ts` |
| 3 | Login utente bannato → 500 invece di 403 | `auth.controller.ts` |
| 4 | firstName/lastName nel form ma ignorati (non nel DB) | `RegisterForm.tsx`, `validators.ts` |

## Feature aggiunta

**Selezione ruolo al signup**: radio group CUSTOMER (default) / VENDOR nel form di registrazione. Il ruolo viene salvato nel DB al momento della creazione dell'utente.

## File modificati

| File | Modifica |
|------|----------|
| `services/auth-service/src/validators/auth.validator.ts` | + validazione opzionale `role` |
| `services/auth-service/src/services/auth.service.ts` | `register()` accetta `role` param |
| `services/auth-service/src/controllers/auth.controller.ts` | passa `role` + fix banned → 403 |
| `frontend/store-app/src/services/api.ts` | fix error message parsing |
| `frontend/store-app/src/lib/validators.ts` | fix password policy, add role, remove firstName/lastName |
| `frontend/store-app/src/components/features/auth/RegisterForm.tsx` | rimuovi Nome/Cognome, aggiungi role selector |
| `frontend/store-app/src/services/auth.service.ts` | invia `role` nel payload |

## Stato

- [x] Conductor track creato
- [x] Backend fixes + role param
- [x] Docker rebuild auth-service
- [x] Frontend fixes
- [x] TypeScript check
