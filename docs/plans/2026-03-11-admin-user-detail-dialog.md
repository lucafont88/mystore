# Admin User Detail Dialog — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Cliccando su email in Gestione Utenti, dialog con account, anagrafica vendor e verifica identita. Admin puo resettare identityStatus a PENDING o forzarlo a VERIFIED.

**Architecture:** Due TanStack Query parallele (Approccio A). Force-VERIFIED riusa identityVerifiedPublisher in user-data-service; consumer auth-service imposta profileStatus=COMPLETE.

**Tech Stack:** Express + TypeScript + Prisma, React 18 + TanStack Query + shadcn/ui, RabbitMQ.

---

## Task 1 — auth-service: GET /admin/users/:id

**Files:**
- Modify: services/auth-service/src/controllers/adminUser.controller.ts
- Modify: services/auth-service/src/routes/adminUser.routes.ts

### Step 1: Aggiungere getUserDetail nel controller (prima di resetPassword)

prisma.user.findUnique({ where: { id }, select: { id, email, role, isBanned, profileStatus, lastLoginAt, createdAt, ipLogs(top20) } })
404 se non trovato. Response: { id, email, role, isBanned, profileStatus, lastLoginAt, createdAt, ipHistory }

### Step 2: Route GET /:id in adminUser.routes.ts (dopo DELETE)

  router.get('/:id', authenticate, authorize(['ADMIN']), getUserDetail)

### Step 3: Build + restart

  docker compose build auth-service && docker compose up -d auth-service

### Step 4: Test curl

  curl http://localhost:3000/api/v1/admin/users/ID -H 'Authorization: Bearer TOKEN' | jq .

### Step 5: Commit

  git add services/auth-service/src/...
  git commit -m 'feat(auth-service): GET /admin/users/:id endpoint'

---

## Task 2 — user-data-service: admin vendor profile endpoints

**Files:**
- Create: services/user-data-service/src/controllers/adminVendorProfile.controller.ts
- Modify: services/user-data-service/src/routes/index.ts

### Step 1: Creare adminVendorProfile.controller.ts

Import: publishIdentityVerified da ../events/identityVerifiedPublisher, prisma da ../config/db, AuthRequest da ../middleware/auth.middleware

Metodo getVendorProfile: prisma.vendorProfile.findUnique({ where: { userId } }), 404 se non trovato.
Metodo setIdentityStatus: validare PENDING|VERIFIED, update DB, se VERIFIED chiamare publishIdentityVerified(userId).

### Step 2: Route in routes/index.ts

  router.get('/admin/vendor-profile/:userId', authenticate, authorize(['ADMIN']), getVendorProfile)
  router.put('/admin/vendor-profile/:userId/identity-status', authenticate, authorize(['ADMIN']), setIdentityStatus)

### Step 3: Build + restart

  docker compose build user-data-service && docker compose up -d user-data-service

### Step 4: Test curl

  curl http://localhost:3000/api/v1/user-data/admin/vendor-profile/VENDOR_ID -H 'Authorization: Bearer TOKEN' | jq .

### Step 5: Commit

  git commit -m 'feat(user-data-service): admin vendor profile and identity status endpoints'

---

## Task 3 — Frontend: service + query hooks

**Files:**
- Modify: frontend/store-app/src/services/adminUsers.service.ts
- Modify: frontend/store-app/src/queries/useAdminUsersQuery.ts

### Step 1: Tipi in adminUsers.service.ts

AdminUserDetail extends AdminUser { profileStatus: COMPLETE|PENDING_PROFILE|PENDING_IDENTITY }
VendorProfile { id, userId, status, firstName, lastName, dateOfBirth, gender?, fiscalCode, businessName, vatNumber?, contactEmail, phoneNumber, address:{street,city,zip,country}, identityStatus:PENDING|PROCESSING|VERIFIED|FAILED, createdAt, updatedAt }

### Step 2: Funzioni nel oggetto adminUsersService

  getUserDetail: (id) => api.get<AdminUserDetail>('/admin/users/' + id)
  getVendorProfile: (userId) => api.get<VendorProfile>('/user-data/admin/vendor-profile/' + userId)
  setIdentityStatus: (userId, status) => api.put('/user-data/admin/vendor-profile/' + userId + '/identity-status', { status })

### Step 3: Hook in useAdminUsersQuery.ts

  useAdminUserDetailQuery(userId: string|null) — queryKey: ['admin-user-detail', userId], enabled: \!\!userId
  useAdminVendorProfileQuery(userId: string|null, role: string|undefined) — enabled: \!\!userId && role === 'VENDOR'
  useAdminSetIdentityStatusMutation() — onSuccess invalida entrambe le query

### Step 4: Commit

  git commit -m 'feat(frontend): admin user detail and vendor profile hooks'

---

## Task 4 — Frontend: dialog UI

**File:** frontend/store-app/src/pages/Admin/Users/index.tsx

### Step 1: Costanti colore (dopo ROLE_COLORS)

IDENTITY_STATUS_COLORS: { PENDING:gray, PROCESSING:yellow, VERIFIED:green, FAILED:red }
PROFILE_STATUS_COLORS: { COMPLETE:green, PENDING_PROFILE:yellow, PENDING_IDENTITY:orange }

### Step 2: Stato e handler (dopo mutation esistenti)

  const setIdentityStatusMutation = useAdminSetIdentityStatusMutation()
  const [detailUserId, setDetailUserId] = useState<string|null>(null)
  const [detailUserRole, setDetailUserRole] = useState<string|undefined>(undefined)
  const { data: userDetail, isLoading: isLoadingDetail } = useAdminUserDetailQuery(detailUserId)
  const { data: vendorProfile, isLoading: isLoadingProfile } = useAdminVendorProfileQuery(detailUserId, detailUserRole)
  function openDetailDialog(user: AdminUser) { setDetailUserId(user.id); setDetailUserRole(user.role) }
  function closeDetailDialog() { setDetailUserId(null); setDetailUserRole(undefined) }

### Step 3: Email cliccabile nella tabella

Sostituire cella email con button onClick={() => openDetailDialog(user)}, className: font-medium text-primary hover:underline

### Step 4: Dialog (aggiungere PRIMA del dialog Cambia Ruolo)

Dialog: open={\!\!detailUserId}, max-w-2xl, overflow-y-auto
Sezione 1 Account (tutti): email, ruolo badge, ban badge, profileStatus badge, lastLogin, createdAt
Sezione 2 Anagrafica (solo VENDOR): nome+cognome, data nascita, CF, PIva, ragione sociale, email contatto, telefono, indirizzo
Sezione 3 Identita (VENDOR + vendorProfile): badge identityStatus + bottoni Reset/Approva
Footer: Button chiudi -> closeDetailDialog

### Step 5: Commit

  git commit -m 'feat(frontend): admin user detail dialog'

---

## Task 5 — i18n translations

**Files:**
- Modify: frontend/store-app/public/locales/it/admin.json (sezione users)
- Modify: frontend/store-app/public/locales/en/admin.json (sezione users)

Chiavi IT: detailTitle, sectionAccount, sectionProfile, sectionIdentity, profileStatus, fullName, dateOfBirth, fiscalCode, vatNumber, businessName, contactEmail, phoneNumber, address, identityStatus, resetIdentity, approveIdentity, noProfile, close
Chiavi EN: stessa struttura in inglese

  git commit -m 'feat(i18n): admin user detail dialog translations IT + EN'

---

## Task 6 — Verifica end-to-end

1. Login admin su http://localhost:5173
2. Click email CUSTOMER -> dialog solo sezione Account
3. Click email VENDOR -> tutte e tre le sezioni
4. Reset verifica su VENDOR VERIFIED -> badge PENDING
5. Approva su VENDOR PENDING -> badge VERIFIED + auth_db profileStatus=COMPLETE
6. Aggiornare conductor/tracks/user_onboard_20260309/plan.md
