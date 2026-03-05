Agisci come un Senior Backend Engineer. Il task è implementare un nuovo flusso di registrazione per i vendor.

### Architettura e Database
1. **Separazione Database:** Dobbiamo isolare i dati di anagrafica utente. 
   - Crea un nuovo container Docker per un'istanza PostgreSQL, chiamato `db-utenti`.
   - Crea anhce un nuovo service, chiamalo `user-data-service` che dialoga con il `db-utenti` e sarà quello a gestire le operazioni sul `db-utenti`
   - Il database esistente (`db-shop`) deve rimanere dedicato esclusivamente alla logica di business dello shop.
   - Configura le variabili d'ambiente necessarie per la connessione al nuovo db-utenti nel file di configurazione principale.

2. **Setup:**
   - Inserisci il servizio `db-utenti` nel file `docker-compose.yml` (o equivalente).
   - Inserisci il servizio `user-data-service` nel file `docker-compose.yml` (o equivalente).
   - Crea le migrazioni iniziali (o lo schema SQL) per la tabella `vendor_profiles` all'interno di `db-utenti`.

### Logica di Registrazione (Processo in due fasi)
Il flusso di registrazione deve essere gestito come segue:
1. **Fase 1 (Auth):** L'utente seleziona "Vendor" durante la registrazione. Crea le credenziali base (email/password) nel `db-shop` (o dove risiede l'auth corrente).
2. **Fase 2 (Anagrafica):** Dopo il successo della fase 1, l'utente deve essere reindirizzato al form di completamento anagrafica.

### Schema Anagrafica (Fase MVP)
Implementa la tabella `vendor_profiles` nel `db-utenti` con i seguenti campi minimi:
- `user_id`: (FK/Reference all'ID utente creato nella fase 1)
- `first_name`: VARCHAR
- `last_name`: VARCHAR
- `date_of_birth`: DATE
- `gender`: VARCHAR (opzionale)
- `fiscal_code`: VARCHAR (Codice Fiscale)
- `business_name`: VARCHAR
- `vat_number`: VARCHAR (PIVA) (opzionale)
- `contact_email`: VARCHAR
- `phone_number`: VARCHAR
- `address`: JSONB (per mantenere flessibilità)
- `created_at` / `updated_at`: TIMESTAMP

### Task da eseguire:
1. Crea il file di migrazione per la tabella `vendor_profiles` nel contesto del `db-utenti`.
2. Aggiungi i nuovi servizi al `docker-compose.yml`.
3. Crea il servizio di base `user-data-service` che gestisca la creazione del profilo una volta completata l'auth.
4. Implementa la logica di reindirizzamento dopo la fase 1.

Procedi per passi, partendo dall'infrastruttura (docker e db) e poi passando allo schema del database. Chiedimi conferma prima di eseguire migrazioni distruttive.
Ricordati di aggiornare il track ed il file `MEMORY.md` con le modifiche fatte.
Se hai dubbi o hai bisogno di chiarimenti, chiedimi pure!
