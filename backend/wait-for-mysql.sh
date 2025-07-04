#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

echo "Esperando a que MySQL en $host esté disponible..."

until mysqladmin ping -h "$host" --silent; do
  echo "MySQL no está listo todavía, esperando 2 segundos..."
  sleep 2
done

echo "MySQL está listo, ejecutando comando..."
exec $cmd
