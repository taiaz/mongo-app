FROM mongo:8.0.0-rc19-noble

# Tạo thư mục cho các script khởi tạo
RUN mkdir -p /docker-entrypoint-initdb.d

# Sao chép file khởi tạo vào thư mục khởi tạo
COPY init/init-db.js /docker-entrypoint-initdb.d/

# Khởi động MongoDB với xác thực bật
CMD ["mongod", "--auth"]
