// Lấy thông tin tài khoản admin từ biến môi trường
var adminUser = process.env.MONGO_INITDB_ROOT_USERNAME;
var adminPass = process.env.MONGO_INITDB_ROOT_PASSWORD;

// Kết nối tới cơ sở dữ liệu 'user_management'
db = db.getSiblingDB('user_management');

// Tạo user admin với quyền root
db.createUser({
  user: adminUser,
  pwd: adminPass,
  roles: [{ role: "root", db: "admin" }]
});

// Thêm dữ liệu mẫu vào collection 'users', MongoDB sẽ tự động tạo collection này nếu chưa tồn tại
db.users.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Tony Smith", email: "tony@example.com" }
]);
// test
// Cấp quyền readWrite cho user admin trên cơ sở dữ liệu 'user_management'
db.getSiblingDB('admin').grantRolesToUser(adminUser, [{ role: "readWrite", db: "user_management" }]);
