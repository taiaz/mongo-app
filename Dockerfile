FROM mongo:4.4

RUN mkdir -p /docker-entrypoint-initdb.d

COPY init/init-db.js /docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["mongod", "--auth"]
