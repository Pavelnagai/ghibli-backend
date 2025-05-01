#!/bin/sh

# Wait for services to be ready
echo "Waiting for services to be ready..."

# Function to check if a service is ready
check_service() {
    local host=$1
    local port=$2
    local service=$3
    
    while ! nc -z -v -w5 $host $port 2>/dev/null; do
        echo "Waiting for $service..."
        sleep 1
    done
    echo "$service is ready!"
}

# Wait for PostgreSQL
check_service db 5432 "PostgreSQL"

# Wait for MinIO
check_service minio 9000 "MinIO"

echo "All services are ready!"

# Execute the main command
exec "$@" 