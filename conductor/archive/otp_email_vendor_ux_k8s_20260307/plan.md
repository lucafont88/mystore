# Track: OTP Email Verification + Vendor UX improvements + K8s Deploy

## Obiettivo
Aggiungere la verifica email OTP alla registrazione, migliorare la UX della dashboard vendor (sidebar completa, logout redirect, check email duplicata), aggiornare la home con il logo SVG e creare la configurazione Kubernetes completa.

## Funzionalità implementate

### 1. OTP Email Verification al Signup
- **Backend**: nuovi endpoint `POST /auth/register/send-otp` e `POST /auth/register/verify-otp`
- OTP 6 cifre generato con `crypto.randomInt`, salvato in Redis `otp:register:{email}` con TTL 600s
- Password hashata con argon2 subito al send-otp (non plaintext in Redis)
- Email inviata via Resend SaaS (`RESEND_API_KEY` / `RESEND_FROM`)
- Lazy singleton pattern per Resend client (fix crash al startup senza API key)
- **Frontend**: form a 2 step — step 1 = credenziali, step 2 = OTP input + resend con cooldown 60s

### 2. Email existence check on blur
- `GET /auth/check-email?email=xxx` → `{ exists: boolean }`
- Nel form di registrazione: blur sull'email → check → messaggio localizzato se account già esistente
- Submit disabilitato se email duplicata o check in corso

### 3. Vendor Dashboard sidebar
- `VendorLayout` con sidebar sinistra: Dashboard, I miei prodotti, I miei dati, Bundle, I miei metodi di pagamento
- `VendorLayout` incorpora auth check + PENDING_PROFILE guard (sostituisce VendorProfileGuard separato)
- Nuove pagine: `Vendor/Profile/index.tsx` (form anagrafica), `Vendor/PaymentMethods/index.tsx` (placeholder)
- Logout → redirect automatico a home

### 4. Home page logo SVG
- SVG Zelko Market inline nel hero section (sfondo trasparente, no background rect)
- Logo visibile, centrato, drop-shadow indigo, dimensioni w-80 sm:w-[420px]

### 5. K8s Deploy
- `k8s-deploy.yaml` a root del progetto — configurazione completa per tutto lo stack
- Namespace `zelko`, Secret, ConfigMaps, StatefulSets (postgres/db-utenti/redis/rabbitmq/minio), Deployments + HPA, Ingress

## File modificati / creati

| File | Azione |
|------|--------|
| `services/auth-service/src/config/mailer.ts` | CREA — lazy Resend singleton |
| `services/auth-service/src/services/otp.service.ts` | CREA — generateOtp/storeOtp/verifyAndConsumeOtp |
| `services/auth-service/src/services/email.service.ts` | CREA — sendOtpEmail via Resend |
| `services/auth-service/src/validators/auth.validator.ts` | + sendOtpValidator, verifyOtpValidator |
| `services/auth-service/src/controllers/auth.controller.ts` | + checkEmail(), sendOtp(), verifyOtp() |
| `services/auth-service/src/services/auth.service.ts` | + createUser() estratto da register() |
| `services/auth-service/src/routes/auth.routes.ts` | + GET /check-email, POST /register/send-otp, POST /register/verify-otp |
| `docker-compose.yml` | + RESEND_API_KEY + RESEND_FROM env per auth-service |
| `frontend/store-app/src/services/auth.service.ts` | + checkEmail(), sendOtp(), verifyOtp() |
| `frontend/store-app/src/components/features/auth/RegisterForm.tsx` | Riscritto a 2 step |
| `frontend/store-app/public/locales/it/auth.json` | CREA — namespace auth IT |
| `frontend/store-app/public/locales/en/auth.json` | CREA — namespace auth EN |
| `frontend/store-app/src/pages/Vendor/index.tsx` | CREA — VendorLayout con sidebar |
| `frontend/store-app/src/pages/Vendor/Profile/index.tsx` | CREA — pagina anagrafica vendor |
| `frontend/store-app/src/pages/Vendor/PaymentMethods/index.tsx` | CREA — placeholder metodi pagamento |
| `frontend/store-app/src/routes/index.tsx` | + vendor/profile, vendor/payment-methods |
| `frontend/store-app/src/components/layout/Header.tsx` | logout → navigate('/') |
| `frontend/store-app/src/pages/Home/index.tsx` | inline SVG logo hero |
| `k8s-deploy.yaml` | CREA — configurazione K8s completa |

## Stato

- [x] Backend OTP endpoints + email service
- [x] Redis OTP storage con TTL 600s
- [x] Frontend 2-step registration form
- [x] Email check on blur + messaggio localizzato
- [x] Vendor sidebar layout + nuove pagine
- [x] Logout redirect home
- [x] Home hero SVG logo
- [x] i18n namespace auth (IT + EN)
- [x] Docker compose aggiornato per Resend
- [x] k8s-deploy.yaml creato
