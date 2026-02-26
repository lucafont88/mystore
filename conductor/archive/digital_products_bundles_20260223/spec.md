# Specification - Digital Products & Product Bundles

## Overview

Estendere il sistema prodotti esistente per supportare prodotti digitali (tre sottotipi) e bundle fissi di prodotti. L'approccio architetturale è "tabelle separate per sottotipo": il modello `Product` riceve un campo `productType` enum, e ogni tipo digitale ha la propria tabella dedicata collegata 1:1.

## Tech Stack

- **Backend:** Express + TypeScript + Prisma (PostgreSQL) + MinIO + multer
- **Frontend:** React 18 + Vite + TypeScript + Zustand + TanStack Query + shadcn/ui + Tailwind
- **Storage file digitali:** MinIO (bucket `digital-products`)
- **Messaging:** RabbitMQ (eventi prodotto estesi + nuovi eventi bundle)

## Prodotti Digitali

### Sottotipi

1. **DIGITAL_FILE** — File scaricabile (PDF, ZIP, MP3, ecc.)
   - Venditore carica un file su MinIO
   - Cliente scarica dopo l'acquisto tramite URL presigned (expiry 5 min)
   - Limite download configurabile (`maxDownloads`, default 5)

2. **DIGITAL_LICENSE** — Licenza/Chiave
   - Venditore importa chiavi in bulk (CSV/testo)
   - Chiave assegnata al cliente su acquisto
   - Tracking redenzione (`isRedeemed`, `redeemedAt`, `redeemedBy`)

3. **DIGITAL_ACCESS** — Accesso/Abbonamento
   - Accesso a contenuti riservati per un periodo di tempo
   - Configurabile: `accessDurationDays`, `accessUrl`

### Regole comuni prodotti digitali
- `stockQuantity` ignorato (stock illimitato gestito a livello service)
- Quantità nel carrello sempre fissa a 1
- Chiavi licenza mai esposte nelle API pubbliche

## Bundle

- **Bundle fisso**: pacchetto predefinito di N prodotti a prezzo scontato
- **Mix consentito**: un bundle può contenere prodotti fisici e digitali
- Entità separata da `Product` (non è un tipo di prodotto)
- Campi: `name`, `slug`, `price`, `vendorId`, `categoryId`, `images[]`, `isFeatured`, `isActive`
- Validazione: tutti i prodotti del bundle devono appartenere allo stesso venditore
- Disponibilità calcolata a tempo di checkout (dipende da disponibilità di tutti i componenti)

## Data Model (Approccio B — Tabelle Separate per Sottotipo)

```
Product (esteso)
  └── productType: PHYSICAL | DIGITAL_FILE | DIGITAL_LICENSE | DIGITAL_ACCESS
  └── digitalFile?: DigitalFile (1:1)
  └── digitalLicense?: DigitalLicense (1:1)
  │     └── keys: LicenseKey[] (1:N)
  └── digitalAccess?: DigitalAccess (1:1)
  └── bundleItems: BundleItem[] (N:M via Bundle)

Bundle (nuova entità)
  └── items: BundleItem[] (1:N)

BundleItem
  └── bundle: Bundle (N:1)
  └── product: Product (N:1)
  └── quantity: Int
```

## Scope Frontend

### Pagine Venditore
- Lista prodotti con badge tipo
- Form multi-step per creazione/modifica (scelta tipo → campi comuni → campi specifici)
- Gestione chiavi licenza (import bulk, lista, rimozione)
- CRUD bundle con product picker

### Catalogo Pubblico
- Badge tipo su ProductCard
- Info tipo-specifiche su ProductDetail
- Filtro "Tipo prodotto" nei filtri
- Pagine listing + dettaglio bundle con prezzo scontato
- Carrello: supporto bundle + enforce quantity=1 per digitali

## Design Goals

- Migrazione non-breaking: `productType` ha default `PHYSICAL`, nessun dato esistente si rompe
- Riutilizzare pattern MinIO da shop-page-service
- Riutilizzare pattern repository/service/controller da product-service
- Risolvere bug noto `stock` vs `stockQuantity` nel frontend
