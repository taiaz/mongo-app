FROM mongo:8.0.0-rc19-noble

RUN mkdir -p /docker-entrypoint-initdb.d

COPY init/init-db.js /docker-entrypoint-initdb.d/

CMD ["mongod", "--auth"]
