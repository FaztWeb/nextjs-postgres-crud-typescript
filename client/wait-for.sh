#!/bin/sh

echo "HELLO WORLD"

until PGPASSWORD="developer" psql -h "postgres" -U "developer" -d "user_db" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 10
done
  
>&2 echo "Postgres is up - executing command"

npm run dev