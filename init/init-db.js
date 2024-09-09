var adminUser = "ADMIN_USER_PLACEHOLDER";
var adminPass = "ADMIN_PASS_PLACEHOLDER";

// Kết nối tới database admin
db = db.getSiblingDB('admin');

// Kiểm tra xem người dùng có tồn tại không
if (db.getUser(adminUser) === null) {
  // Tạo người dùng admin với quyền truy cập trên cả admin và user_management
  db.createUser({
    user: adminUser,
    pwd: adminPass,
    roles: [
      { role: "root", db: "admin" },  // Quyền root trên admin
      { role: "dbOwner", db: "user_management" }  // Quyền dbOwner trên user_management
    ]
  });
}

// Kết nối tới database user_management
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
