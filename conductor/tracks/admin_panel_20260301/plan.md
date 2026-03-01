# Track: Admin Panel

## Descrizione
Sviluppo progressivo dell'Admin Panel: Dashboard, Gestione Categorie, Gestione Utenti e future sezioni amministrative.

## Fasi

### Phase 1 — Schema Prisma (auth-service)
- [x] Aggiunto `isBanned Boolean @default(false)` al model User
- [x] Aggiunto `lastLoginAt DateTime?` al model User
- [x] Migrazione `add_user_management_fields`

### Phase 2 — Auth service: login update
- [x] Check `isBanned` su login → 401 se bannato
- [x] Aggiornamento `lastLoginAt` su login riuscito

### Phase 3 — Backend admin user endpoints (auth-service)
- [x] `GET /admin/users` — lista tutti gli utenti (ADMIN only)
- [x] `PUT /admin/users/:id/role` — cambia ruolo (ADMIN only)
- [x] `PUT /admin/users/:id/ban` — banna/sbanna (ADMIN only)
- [x] `POST /admin/users/:id/reset-password` — reset con temp password (ADMIN only)
- [x] Docker rebuild auth-service

### Phase 4 — Frontend service + hooks
- [x] `frontend/store-app/src/services/adminUsers.service.ts`
- [x] `frontend/store-app/src/queries/useAdminUsersQuery.ts`

### Phase 5 — Pagina Gestione Utenti
- [x] `frontend/store-app/src/pages/Admin/Users/index.tsx`
  - Tabella: email, ruolo (badge colorato), stato (attivo/bannato), ultimo accesso, data creazione, azioni
  - Dialog cambia ruolo
  - Dialog banna/sbanna
  - Dialog reset password con password temporanea copiabile

### Phase 6 — Sidebar, route, i18n
- [x] Sidebar: aggiunto NavLink "Gestisci Utenti" con icona Users
- [x] Route `/admin/users` aggiunta
- [x] Traduzioni IT e EN aggiornate

## File chiave

| File | Tipo |
|------|------|
| `services/auth-service/prisma/schema.prisma` | Schema DB |
| `services/auth-service/src/services/auth.service.ts` | Login logic |
| `services/auth-service/src/controllers/adminUser.controller.ts` | Controller |
| `services/auth-service/src/routes/adminUser.routes.ts` | Route |
| `frontend/store-app/src/services/adminUsers.service.ts` | API service |
| `frontend/store-app/src/queries/useAdminUsersQuery.ts` | Query hooks |
| `frontend/store-app/src/pages/Admin/Users/index.tsx` | UI page |
| `frontend/store-app/src/pages/Admin/index.tsx` | Sidebar layout |
