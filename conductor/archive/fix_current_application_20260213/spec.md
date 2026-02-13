# Specification - Fix Current Application

## Overview
The frontend application cannot communicate with the backend API due to multiple misalignments between the frontend API client and the backend API Gateway routes. Additionally, the data contracts for authentication (registration and login) are incompatible between frontend and backend, and the auth-service integration tests fail due to missing environment configuration.

## Issues

### Issue 1: API Path Mismatch (Critical)
- **Frontend** `api.ts` uses `BASE_URL = '/api'`, producing paths like `/api/auth/register`, `/api/products`
- **API Gateway** routes are mounted at `/api/v1/auth`, `/api/v1/products`, `/api/v1/categories`
- **Result:** All frontend API calls return 404 Not Found
- **Affected flows:** Registration, Login, Product listing, Product details, Categories

### Issue 2: Registration Data Contract Mismatch (Critical)
- **Frontend** sends: `{ firstName, lastName, email, password, confirmPassword }`
- **Backend** accepts: `{ email, password }` only
- **Backend Prisma User model** has no `firstName`/`lastName` fields
- **Frontend AuthResponse** expects `{ user, token }` but backend returns `{ id, email, role, createdAt, updatedAt }` (no token on register)

### Issue 3: Login Response Contract Mismatch (Critical)
- **Backend** returns: `{ user, accessToken, refreshToken }`
- **Frontend AuthResponse** expects: `{ user, token }`
- **Frontend authStore** stores `token` field but backend provides `accessToken`

### Issue 4: Auth-Service Integration Tests Require Database (Minor)
- `auth.test.ts` performs real Prisma queries requiring `DATABASE_URL`
- The test suite runs without database env vars, causing `PrismaClientInitializationError`
- Tests should either mock Prisma or be marked as integration tests with proper env setup

### Issue 5: Hardcoded Categories in Frontend (Minor)
- Product sidebar shows hardcoded categories ("Elettronica", "Casa", "Abbigliamento") instead of fetching from API

## Tech Stack (no changes)
No changes to the tech stack are required. This track is purely about fixing misalignments.

## Success Criteria
1. Registration flow works end-to-end (frontend -> API Gateway -> auth-service -> DB)
2. Login flow works end-to-end with correct token handling
3. Product listing and detail pages load data from the backend
4. All tests pass (`pnpm test`)
5. Frontend build succeeds (`pnpm --filter @ecommerce/store-app build`)
