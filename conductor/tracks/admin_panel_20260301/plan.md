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

### Phase 7 — IP Tracking (auth-service)
- [x] Aggiunto modello `UserIpLog` con relazione User 1:N + indice `[userId, createdAt DESC]`
- [x] Migrazione `20260304090000_add_user_ip_logs`
- [x] `auth.controller.ts`: estrae IP da `x-forwarded-for` o `req.socket.remoteAddress`
- [x] `auth.service.ts`: `login()` salva IP in `user_ip_logs` (fire-and-forget, cap 20 log per utente)
- [x] `adminUser.controller.ts`: `listUsers()` include `lastIp` + `ipHistory` (ultimi 20)
- [x] Docker rebuild auth-service --no-cache + prisma migrate deploy

### Phase 8 — Vendor Sales Stats (order-service)
- [x] `order.repository.ts`: aggiunto `getAllVendorsStats()` — query bulk `groupBy` + `$queryRaw COUNT(DISTINCT)`
- [x] `order.service.ts`: aggiunto `getAllVendorsStats()`
- [x] `order.controller.ts`: aggiunto `adminVendorsStats()`
- [x] `order.routes.ts`: aggiunto `GET /admin/vendors/stats` (ADMIN only)
- [x] Docker rebuild order-service

### Phase 9 — Frontend: colonne IP + Vendite
- [x] Installato `@radix-ui/react-tooltip`
- [x] Creato `components/ui/tooltip.tsx` (shadcn/ui pattern)
- [x] `pages/admin/index.tsx`: aggiunto `TooltipProvider` wrapper
- [x] `services/adminUsers.service.ts`: aggiunto `IpLogEntry`, `lastIp`, `ipHistory`, `VendorStatsMap`, `getVendorStats()`
- [x] `queries/useAdminUsersQuery.ts`: aggiunto `useAdminVendorStatsQuery()`
- [x] `pages/admin/Users/index.tsx`: colonna "Ultimo IP" con tooltip storico, colonna "Vendite" per VENDOR
- [x] i18n IT+EN: `lastIp`, `ipHistory`, `sales`, `orders`

## File chiave

| File | Tipo |
|------|------|
| `services/auth-service/prisma/schema.prisma` | Schema DB |
| `services/auth-service/src/services/auth.service.ts` | Login logic + IP save |
| `services/auth-service/src/controllers/auth.controller.ts` | IP extraction |
| `services/auth-service/src/controllers/adminUser.controller.ts` | Controller + IP response |
| `services/auth-service/src/routes/adminUser.routes.ts` | Route |
| `services/order-service/src/repositories/order.repository.ts` | getAllVendorsStats() |
| `services/order-service/src/controllers/order.controller.ts` | adminVendorsStats() |
| `services/order-service/src/routes/order.routes.ts` | Route bulk stats |
| `frontend/store-app/src/components/ui/tooltip.tsx` | Tooltip UI component |
| `frontend/store-app/src/services/adminUsers.service.ts` | API service |
| `frontend/store-app/src/queries/useAdminUsersQuery.ts` | Query hooks |
| `frontend/store-app/src/pages/admin/Users/index.tsx` | UI page |
| `frontend/store-app/src/pages/admin/index.tsx` | Sidebar layout + TooltipProvider |
