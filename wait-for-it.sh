#!/bin/sh

# Wait for services to be ready
echo "Waiting for services to be ready..."

# Wait for PostgreSQL
until nc -z db 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

# Wait for MinIO
until nc -z minio 9000; do
  echo "Waiting for MinIO..."
  sleep 1
done

echo "All services are ready!"

# Execute the main command
shift 3  # Remove the first 3 arguments (db:5432 minio:9000 --)
exec "$@" 