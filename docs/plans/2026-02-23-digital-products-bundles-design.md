# Design: Digital Products & Product Bundles

**Data**: 2026-02-23
**Track**: `conductor/tracks/digital_products_bundles_20260223/`

## Problema

Il sistema supporta solo prodotti fisici. I venditori necessitano di vendere anche prodotti digitali (file, licenze, accessi) e pacchetti di prodotti a prezzo scontato.

## Decisioni architetturali

### Approccio scelto: Tabelle separate per sottotipo (Approccio B)

Il modello `Product` riceve un campo discriminante `productType` (enum). Ogni tipo digitale ha la propria tabella dedicata collegata 1:1 al Product. I bundle sono un'entità separata con una tabella ponte `BundleItem`.

**Motivazioni:**
- Integrità a livello DB (un `DigitalFile` deve avere `fileKey`)
- Scalabile: nuovi sottotipi = nuove tabelle, senza allargare Product
- Un singolo `Product` per catalogo, carrello e ricerca
- Bundle puntano a `Product.id` indipendentemente dal tipo

**Alternative scartate:**
- Approccio A (colonna discriminante unica): campi nullable non garantiscono integrità
- Approccio C (entità separate): duplicazione massiva, riferimenti polimorfici nei bundle

## Data Model

```
Product
  ├── productType: PHYSICAL | DIGITAL_FILE | DIGITAL_LICENSE | DIGITAL_ACCESS
  ├── digitalFile?: DigitalFile (1:1) → fileKey, fileName, fileSize, mimeType, maxDownloads
  ├── digitalLicense?: DigitalLicense (1:1)
  │     └── keys: LicenseKey[] → key, isRedeemed, redeemedAt, redeemedBy
  ├── digitalAccess?: DigitalAccess (1:1) → accessDurationDays, accessUrl
  └── bundleItems: BundleItem[]

Bundle
  ├── name, slug, price, vendorId, categoryId, images[], isFeatured, isActive
  └── items: BundleItem[] → product, quantity
```

## API Design

- `/api/v1/digital-products` — CRUD prodotti digitali (VENDOR auth)
- `/api/v1/digital-products/:id/file` — upload file (VENDOR)
- `/api/v1/digital-products/:id/download` — presigned URL (autenticato)
- `/api/v1/digital-products/:id/license-keys` — gestione chiavi (VENDOR)
- `/api/v1/bundles` — CRUD bundle (GET pubblico, POST/PUT/DELETE VENDOR)
- `GET /api/v1/products` — esteso con filtro `productType`

## Frontend

- **Vendor**: pagine CRUD per prodotti digitali (form multi-step) e bundle (con product picker)
- **Catalogo**: badge tipo su ProductCard, info tipo-specifiche su detail, filtro tipo, pagine bundle
- **Carrello**: supporto bundle, quantity=1 per digitali

## Rischi e mitigazioni

| Rischio | Mitigazione |
|---------|-------------|
| Upload file via API Gateway | Verificare che express.json() non si applichi a rotte multipart |
| Sicurezza chiavi licenza | Mai esporre in API pubbliche |
| Download non autorizzato | URL presigned con expiry 5 min + verifica acquisto |
| Stock bundle | Check a tempo di checkout su tutti i componenti |
