// var adminUser = process.env.MONGO_INITDB_ROOT_USERNAME;
// var adminPass = process.env.MONGO_INITDB_ROOT_PASSWORD;

var adminUser = MONGO_INITDB_ROOT_USERNAME;
var adminPass = MONGO_INITDB_ROOT_PASSWORD;

db = db.getSiblingDB('admin');

// Kiểm tra xem người dùng có tồn tại không
if (db.getUser(adminUser) === null) {
  // Tạo người dùng root trong cơ sở dữ liệu admin
  db.createUser({
    user: adminUser,
    pwd: adminPass,
    roles: [{ role: "root", db: "admin" }]
  });
}

// Chuyển sang cơ sở dữ liệu user_management
db = db.getSiblingDB('user_management');

// Kiểm tra xem collection users có tồn tại chưa
if (!db.getCollectionNames().includes('users')) {
  // Tạo collection nếu chưa tồn tại
  db.createCollection("users");

  // Thêm dữ liệu vào collection users
  db.users.insertMany([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Tony Smith", email: "tony@example.com" }
  ]);
}
