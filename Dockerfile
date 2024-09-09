# Sử dụng phiên bản MongoDB phù hợp
FROM mongo:8.0.0-rc19-noble

# Copy file init-db.js vào thư mục init của MongoDB để tự động chạy khi container khởi động
COPY ./init/init-db.js /docker-entrypoint-initdb.d/

# Expose cổng 27017 để MongoDB có thể truy cập từ bên ngoài
EXPOSE 27017

# Khởi chạy MongoDB với entrypoint mặc định
CMD ["mongod"]
