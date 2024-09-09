var adminUser = "ADMIN_USER_PLACEHOLDER";
var adminPass = "ADMIN_PASS_PLACEHOLDER";

// Kết nối tới database admin
db = db.getSiblingDB('admin');

// Tạo người dùng admin trong database admin nếu chưa tồn tại
if (db.getUser(adminUser) === null) {
  db.createUser({
    user: adminUser,
    pwd: adminPass,
    roles: [
      { role: "root", db: "admin" },  // Quyền root trên admin
    ]
  });
}

// Kết nối tới database user_management
db = db.getSiblingDB('user_management');

// Tạo collection users nếu chưa có
if (!db.getCollectionNames().includes('users')) {
  db.createCollection("users");
  db.users.insertMany([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Tony Smith", email: "tony@example.com" }
  ]);
}

// Quay lại database admin và cấp quyền readWrite cho adminUser trên user_management
db = db.getSiblingDB('admin');
db.grantRolesToUser(adminUser, [{ role: "readWrite", db: "user_management" }]);
