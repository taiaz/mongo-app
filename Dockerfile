FROM mongo:4.4

# Sao chép các file cần thiết
COPY init/init-db.js /docker-entrypoint-initdb.d/
COPY init/init.sh /init.sh

# Đảm bảo quyền thực thi cho shell script
RUN chmod +x /init.sh

# Sử dụng shell script để inject biến môi trường và khởi động MongoDB
ENTRYPOINT ["/init.sh"]
CMD ["mongod", "--auth"]
