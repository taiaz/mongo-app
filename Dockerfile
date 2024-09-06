FROM mongo:6.0

RUN mkdir -p /docker-entrypoint-initdb.d

COPY init/init-db.js /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get install -y mongodb-clients

CMD ["mongod", "--auth"]
