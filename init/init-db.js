var adminUser = "ADMIN_USER_PLACEHOLDER";
var adminPass = "ADMIN_PASS_PLACEHOLDER";

db = db.getSiblingDB('admin');

// Kiểm tra xem người dùng có tồn tại không
if (db.getUser(adminUser) === null) {
  db.createUser({
    user: adminUser,
    pwd: adminPass,
    roles: [{ role: "root", db: "admin" }]
  });
}

db = db.getSiblingDB('user_management');

// Kiểm tra xem collection users có tồn tại chưa
if (!db.getCollectionNames().includes('users')) {
  db.createCollection("users");

  db.users.insertMany([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Tony Smith", email: "tony@example.com" }
  ]);
}
