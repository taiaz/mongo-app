// Lấy giá trị từ biến môi trường (được inject bởi Kubernetes Secrets)
var adminUser = process.env.MONGO_INITDB_ROOT_USERNAME;
var adminPass = process.env.MONGO_INITDB_ROOT_PASSWORD;

// Chuyển sang database 'user_management'
db = db.getSiblingDB('user_management');

// Tạo user admin với quyền root
db.createUser({
  user: adminUser,
  pwd: adminPass,
  roles: [ { role: "root", db: "admin" } ]
});

// Chuyển sang database 'user_management'
db = db.getSiblingDB('user_management');

// Tạo collection 'users' và thêm dữ liệu mặc định
db.createCollection("users");
db.users.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Tony Smith", email: "tony@example.com" }
]);

// Cấp quyền readWrite cho user 'admin' trên 'user_management'
db.getSiblingDB('admin').grantRolesToUser(adminUser, [{ role: "readWrite", db: "user_management" }]);
