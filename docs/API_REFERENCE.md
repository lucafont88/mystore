# API Reference

Riferimento completo di tutti gli endpoint REST della piattaforma.

> **Base URL (sviluppo):** `http://localhost:3000`
> **Prefisso comune:** `/api/v1`
> **Aggiornato al:** 2026-03-02

---

## Autenticazione

Tutti gli endpoint protetti richiedono l'header:
```
Authorization: Bearer <access_token>
```

Il token JWT viene rilasciato al login e al refresh.

---

## Auth Service — `/api/v1/auth`

### Registrazione

```
POST /api/v1/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "Mario",
  "lastName": "Rossi"
}
```

**Response 201:**
```json
{
  "user": { "id": "uuid", "email": "...", "role": "CUSTOMER" },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

---

### Login

```
POST /api/v1/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response 200:**
```json
{
  "user": { "id": "uuid", "email": "...", "role": "CUSTOMER" },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errori:**
- `401` — credenziali non valide
- `401` — account bannato (`Account bannato`)

---

### Refresh Token

```
POST /api/v1/auth/refresh
```

**Body:**
```json
{ "refreshToken": "eyJ..." }
```

**Response 200:**
```json
{ "accessToken": "eyJ..." }
```

---

### Logout

```
POST /api/v1/auth/logout
```
🔒 Richiede autenticazione.

**Body:**
```json
{ "refreshToken": "eyJ..." }
```

---

### Profilo utente

```
GET /api/v1/auth/profile
```
🔒 Richiede autenticazione.

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "CUSTOMER",
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

---

### Aggiorna profilo

```
PUT /api/v1/auth/profile
```
🔒 Richiede autenticazione.

**Body:** campi da aggiornare (firstName, lastName, ecc.)

---

## Admin Users — `/api/v1/admin/users`

Tutti gli endpoint richiedono ruolo **ADMIN**.

### Lista utenti

```
GET /api/v1/admin/users
```
🔒 Richiede `ADMIN`.

**Response 200:**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "isBanned": false,
    "lastLoginAt": "2026-03-01T09:00:00.000Z",
    "createdAt": "2026-01-15T10:00:00.000Z"
  }
]
```

---

### Cambia ruolo utente

```
PUT /api/v1/admin/users/:id/role
```
🔒 Richiede `ADMIN`.

**Body:**
```json
{ "role": "VENDOR" }
```

Ruoli validi: `CUSTOMER`, `VENDOR`, `ADMIN`, `SUPPORT`

**Response 200:** utente aggiornato

---

### Ban / Unban utente

```
PUT /api/v1/admin/users/:id/ban
```
🔒 Richiede `ADMIN`.

**Body:**
```json
{ "banned": true }
```

**Response 200:** utente aggiornato

---

### Reset password utente

```
POST /api/v1/admin/users/:id/reset-password
```
🔒 Richiede `ADMIN`.

**Response 200:**
```json
{ "tempPassword": "Tmp_ABC123!" }
```

La password temporanea segue il formato `Tmp_XXXXXX!` dove `XXXXXX` è alfanumerico maiuscolo casuale. L'utente dovrà cambiarla al primo accesso.

---

## Products — `/api/v1/products`

### Lista prodotti

```
GET /api/v1/products?page=1&limit=20&categoryId=uuid&productType=PHYSICAL&q=ricerca
```

**Query params:**
| Param | Tipo | Descrizione |
|-------|------|-------------|
| `page` | number | Pagina (default: 1) |
| `limit` | number | Risultati per pagina (default: 20) |
| `categoryId` | UUID | Filtra per categoria |
| `productType` | ENUM | `PHYSICAL`, `DIGITAL_FILE`, `DIGITAL_LICENSE`, `DIGITAL_ACCESS` |
| `q` | string | Ricerca full-text |
| `includeBundles` | boolean | Include bundle nei risultati |

**Response 200:**
```json
{
  "items": [...],
  "total": 42
}
```

---

### Dettaglio prodotto

```
GET /api/v1/products/:id
```

---

### Crea prodotto

```
POST /api/v1/products
```
🔒 Richiede `VENDOR` o `ADMIN`.

**Body (prodotto fisico):**
```json
{
  "name": "Nome prodotto",
  "description": "...",
  "price": 29.99,
  "stock": 100,
  "categoryId": "uuid",
  "productType": "PHYSICAL"
}
```

---

### Aggiorna prodotto

```
PUT /api/v1/products/:id
```
🔒 Richiede `VENDOR` (solo propri prodotti) o `ADMIN`.

---

### Elimina prodotto

```
DELETE /api/v1/products/:id
```
🔒 Richiede `VENDOR` o `ADMIN`.

---

## Categories — `/api/v1/categories`

### Lista categorie (con cache Redis)

```
GET /api/v1/categories
```

**Response:** array di categorie. La risposta è servita da Redis (cache-aside, TTL fino alle 03:30 AM).

---

### Albero categorie

```
GET /api/v1/categories/tree
```

---

### Crea categoria

```
POST /api/v1/categories
```
🔒 Richiede `ADMIN`.

**Body:**
```json
{
  "name": "Elettronica",
  "slug": "elettronica",
  "parentId": null
}
```

---

### Aggiorna categoria

```
PUT /api/v1/categories/:id
```
🔒 Richiede `ADMIN`.

---

### Elimina categoria

```
DELETE /api/v1/categories/:id
```
🔒 Richiede `ADMIN`. Response: `204 No Content`.

---

## Digital Products — `/api/v1/digital-products`

### Crea prodotto digitale

```
POST /api/v1/digital-products
```
🔒 Richiede `VENDOR`.

Supporta upload multipart per `DIGITAL_FILE`.

---

### Upload file digitale

```
POST /api/v1/digital-products/:id/upload
```
🔒 Richiede `VENDOR`.

**Content-Type:** `multipart/form-data`

Il file viene salvato su MinIO e l'URL presigned viene generato al download.

---

### License Keys — import bulk

```
POST /api/v1/digital-products/:id/license-keys
```
🔒 Richiede `VENDOR`.

**Body:**
```json
{ "keys": ["KEY-001", "KEY-002", "KEY-003"] }
```

---

## Bundles — `/api/v1/bundles`

### Lista bundle

```
GET /api/v1/bundles?page=1&limit=20
```

---

### Dettaglio bundle

```
GET /api/v1/bundles/:id
```

**Response include:** `items` (prodotti nel bundle), `discountPercent`, `totalPrice`, `discountedPrice`

---

### Crea bundle

```
POST /api/v1/bundles
```
🔒 Richiede `VENDOR`.

**Body:**
```json
{
  "name": "Starter Pack",
  "description": "...",
  "discountPercent": 15,
  "categoryId": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 1 }
  ]
}
```

---

### Aggiorna bundle

```
PUT /api/v1/bundles/:id
```
🔒 Richiede `VENDOR`.

---

### Elimina bundle

```
DELETE /api/v1/bundles/:id
```
🔒 Richiede `VENDOR`.

---

## Orders — `/api/v1/orders`

### Crea ordine (checkout)

```
POST /api/v1/orders
```
🔒 Richiede autenticazione.

**Body:**
```json
{
  "items": [
    {
      "productId": "uuid",
      "vendorId": "uuid",
      "quantity": 2,
      "price": 29.99
    }
  ]
}
```

---

### Lista ordini utente

```
GET /api/v1/orders?page=1&limit=20
```
🔒 Richiede autenticazione.

---

### Statistiche vendor

```
GET /api/v1/orders/vendor/stats?period=30
```
🔒 Richiede `VENDOR`.

**Query params:**
- `period`: giorni da includere (default: 30)

**Response:**
```json
{
  "totalRevenue": 1250.00,
  "totalOrders": 42,
  "dailyStats": [
    { "date": "2026-03-01", "revenue": 150.00, "orders": 5 }
  ]
}
```

---

### Statistiche admin

```
GET /api/v1/orders/admin/stats?period=30
```
🔒 Richiede `ADMIN`.

**Response:** stessa struttura di vendor stats ma aggregata sull'intera piattaforma.

---

## Shop Pages — `/api/v1/shop-pages`

### Lista pagine vendor

```
GET /api/v1/shop-pages?page=1&limit=20
```
🔒 Richiede `VENDOR`.

**Response:**
```json
{
  "items": [...],
  "total": 5
}
```

---

### Dettaglio pagina (include HTML)

```
GET /api/v1/shop-pages/:id
```
🔒 Richiede `VENDOR`.

**Response include:** `htmlContent` letto da MinIO in tempo reale.

---

### Crea pagina

```
POST /api/v1/shop-pages
```
🔒 Richiede `VENDOR`.

**Body:**
```json
{
  "title": "La mia vetrina",
  "slug": "mia-vetrina"
}
```

---

### Salva contenuto HTML

```
PUT /api/v1/shop-pages/:id/content
```
🔒 Richiede `VENDOR`.

**Body:**
```json
{ "htmlContent": "<div>...</div>" }
```

**Nota:** il campo è `htmlContent` (non `html`) sia nel frontend che nel controller.

---

### Pubblica pagina

```
POST /api/v1/shop-pages/:id/publish
```
🔒 Richiede `VENDOR`.

---

### Elimina pagina

```
DELETE /api/v1/shop-pages/:id
```
🔒 Richiede `VENDOR`.

---

## Codici di errore comuni

| Codice | Descrizione |
|--------|-------------|
| `400` | Bad Request — dati mancanti o non validi |
| `401` | Unauthorized — token mancante, scaduto, o account bannato |
| `403` | Forbidden — ruolo insufficiente |
| `404` | Not Found |
| `409` | Conflict — es. email già esistente |
| `500` | Internal Server Error |

---

## Esempi pratici (curl)

### Login e salva token

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mystore.com","password":"Admin2026!"}' \
  | jq -r '.accessToken')
echo "Token: $TOKEN"
```

### Lista utenti (admin)

```bash
curl http://localhost:3000/api/v1/admin/users \
  -H "Authorization: Bearer $TOKEN"
```

### Ban utente

```bash
curl -X PUT http://localhost:3000/api/v1/admin/users/<USER_ID>/ban \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"banned": true}'
```

### Reset password utente

```bash
curl -X POST http://localhost:3000/api/v1/admin/users/<USER_ID>/reset-password \
  -H "Authorization: Bearer $TOKEN"
# Response: {"tempPassword":"Tmp_ABC123!"}
```

### Lista categorie

```bash
curl http://localhost:3000/api/v1/categories
```

### Crea categoria (admin)

```bash
curl -X POST http://localhost:3000/api/v1/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Elettronica","slug":"elettronica"}'
```
