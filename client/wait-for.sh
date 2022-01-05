#!/bin/sh
# wait-for-postgres.sh

set -e
  
shift

until PGPASSWORD="developer" psql -h "postgres" -U "developer" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 10
done
  
>&2 echo "Postgres is up - executing command"

npm run dev