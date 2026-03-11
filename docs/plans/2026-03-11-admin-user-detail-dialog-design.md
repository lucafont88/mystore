# Design: Admin User Detail Dialog

**Date:** 2026-03-11  
**Branch:** user-onboard

## Obiettivo

Nella pagina "Gestione Utenti" dell'admin, cliccando sull'email di un utente si apre un dialog con i dettagli completi: informazioni account, anagrafica vendor e stato della verifica identità. L'admin può resettare l'identityStatus a PENDING o forzarlo a VERIFIED.

---

## Architettura — Approccio A (due chiamate parallele)

Ogni servizio espone e gestisce i propri dati. Il frontend fa due query TanStack Query in parallelo quando il dialog si apre.

---

## Backend

### auth-service — nuovo endpoint

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| `GET` | `/api/v1/admin/users/:id` | ADMIN | Dettaglio utente da auth_db |

Response: id, email, role, isBanned, profileStatus, lastLoginAt, createdAt, ipHistory[]

### user-data-service — nuovi endpoint admin

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| `GET` | `/api/v1/user-data/admin/vendor-profile/:userId` | ADMIN | Profilo vendor (404 se non esiste) |
| `PUT` | `/api/v1/user-data/admin/vendor-profile/:userId/identity-status` | ADMIN | Aggiorna identityStatus |

**Logica PUT:**
- `PENDING` → aggiorna solo identityStatus nel DB
- `VERIFIED` → aggiorna identityStatus + pubblica evento identity.verified esistente → auth-service imposta profileStatus=COMPLETE

Nessuna modifica al gateway.

---

## Frontend

### Trigger
L'email nella tabella diventa un elemento cliccabile che apre il dialog.

### Query / Mutations

- `useAdminUserDetailQuery(userId)` — GET /admin/users/:id
- `useAdminVendorProfileQuery(userId, role)` — GET /user-data/admin/vendor-profile/:userId (solo VENDOR)
- `useAdminSetIdentityStatusMutation()` — PUT /user-data/admin/vendor-profile/:userId/identity-status

### Struttura dialog

**Sezione 1 — Account** (tutti): email, ruolo, stato ban, profileStatus, lastLoginAt, createdAt, IP history

**Sezione 2 — Anagrafica** (solo VENDOR): nome/cognome, data nascita, genere, CF, ragione sociale, P.IVA, email contatto, telefono, indirizzo

**Sezione 3 — Verifica identità** (solo VENDOR): badge identityStatus + bottoni "Reset verifica" (→ PENDING) e "Approva manualmente" (→ VERIFIED)

---

## File da modificare

| File | Tipo |
|------|------|
| auth-service controller + routes | modifica |
| user-data-service controller admin + routes | nuovo |
| `src/services/adminUsers.service.ts` | modifica |
| `src/queries/useAdminUsersQuery.ts` | modifica |
| `src/pages/Admin/Users/index.tsx` | modifica |
| `public/locales/{it,en}/admin.json` | modifica |

---

## Stato

- [ ] auth-service: GET /admin/users/:id
- [ ] user-data-service: GET + PUT admin endpoints
- [ ] Frontend: query + mutations + dialog UI
- [ ] i18n IT + EN
- [ ] Rebuild Docker + test
