#!/bin/sh
# wait-for-postgres.sh

set -e
  
host="$1"
shift
  
until PGPASSWORD="minecr@ft1" psql -h "$host" -U "developer" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec "$@"

