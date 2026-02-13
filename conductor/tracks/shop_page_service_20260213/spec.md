# Specification: Shop Page Service

## Obiettivo
Implementare un microservizio per la creazione e gestione di pagine di vendita HTML da parte dei vendor, con object storage su MinIO e comunicazione asincrona via RabbitMQ con il product-service.

## Requisiti Funzionali

### RF-1: Gestione ShopPage
- Solo utenti con ruolo VENDOR possono creare/gestire pagine
- Ogni pagina ha: title, slug, description, status, vendorId, htmlKey
- Slug generato automaticamente dal titolo (con unicità garantita)

### RF-2: Ciclo di Vita della Pagina
- **NEW_PAGE**: Pagina appena creata, senza contenuto HTML
- **DRAFT**: Contenuto HTML salvato su MinIO
- **PUBLISHED**: Pagina visibile pubblicamente

Transizioni valide:
- NEW_PAGE → DRAFT (tramite saveContent)
- DRAFT → PUBLISHED (tramite publish)
- PUBLISHED → DRAFT (tramite unpublish)

### RF-3: Associazione Prodotti
- Relazione many-to-many tra ShopPage e prodotti (via ShopPageProduct)
- Placeholder HTML `{{product:uuid}}` per posizionamento visivo
- Validazione prodotti via RabbitMQ RPC al product-service
- Rimozione automatica associazioni quando un prodotto viene eliminato

### RF-4: Storage HTML su MinIO
- Contenuto HTML salvato come oggetto su MinIO (bucket: shop-pages)
- Chiave: `{vendorId}/{pageId}.html`
- Supporto per pagine fino a 5MB

### RF-5: Endpoint Pubblico
- GET `/api/v1/shop-pages/public/:slug` restituisce la pagina pubblicata con HTML e dati prodotto

## Requisiti Non Funzionali

### RNF-1: Modulo RabbitMQ Condiviso
- Modulo messaging in @ecommerce/shared riutilizzabile da tutti i servizi
- Connection manager con auto-reconnect e backoff esponenziale
- Pattern publisher/subscriber e RPC

### RNF-2: Osservabilità
- Integrazione completa con @ecommerce/shared (logging, tracing, metrics)
- OpenTelemetry AMQP instrumentation già configurata

### RNF-3: Test
- Repository test con DB reale
- Service test con mock
- Integration test con supertest
- Target: >80% coverage

## Criteri di Successo
1. Tutti i test passano (shop-page-service + product-service senza regressioni)
2. Type-check OK per tutti i servizi
3. API Gateway proxy funzionante
4. CRUD completo via API con autenticazione VENDOR
