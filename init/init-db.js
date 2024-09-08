
var adminUser = process.env.MONGO_INITDB_ROOT_USERNAME;
var adminPass = process.env.MONGO_INITDB_ROOT_PASSWORD;

db = db.getSiblingDB('admin');

db.createUser({
  user: adminUser,
  pwd: adminPass,
  roles: [ { role: "root", db: "admin" } ]
});

db = db.getSiblingDB('user_management');

db.users.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Tony Smith", email: "tony@example.com" }
]);
