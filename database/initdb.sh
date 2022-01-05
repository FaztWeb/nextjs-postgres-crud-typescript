#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE shadow_user_db;
    GRANT ALL PRIVILEGES ON DATABASE shadow_user_db TO developer;
EOSQL