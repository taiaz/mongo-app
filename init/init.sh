#!/bin/bash

# Lấy biến môi trường từ Kubernetes hoặc Docker
ADMIN_USER=${MONGO_INITDB_ROOT_USERNAME}
ADMIN_PASS=${MONGO_INITDB_ROOT_PASSWORD}

# Thay thế các placeholder trong init-db.js bằng giá trị từ biến môi trường
sed -i "s|ADMIN_USER_PLACEHOLDER|$ADMIN_USER|g" /docker-entrypoint-initdb.d/init-db.js
sed -i "s|ADMIN_PASS_PLACEHOLDER|$ADMIN_PASS|g" /docker-entrypoint-initdb.d/init-db.js

# Khởi động MongoDB
exec "$@"
