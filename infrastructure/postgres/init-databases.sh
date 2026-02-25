#!/bin/bash
set -e

# Create additional databases needed by microservices
# auth_db is created automatically via POSTGRES_DB env var

for db in products_db shop_pages_db orders_db; do
  echo "Creating database '$db' if it does not exist..."
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    SELECT 'CREATE DATABASE $db'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
EOSQL
done

echo "All databases initialized."
