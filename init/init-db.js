db = db.getSiblingDB('admin');

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [ { role: "root", db: "admin" } ]
});

db = db.getSiblingDB('mydatabase');

db.mycollection.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" }
]);
