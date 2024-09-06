// Lấy giá trị từ biến môi trường (được inject bởi Kubernetes Secrets)
var adminUser = process.env.MONGO_INITDB_ROOT_USERNAME;
var adminPass = process.env.MONGO_INITDB_ROOT_PASSWORD;

// Chuyển sang database 'admin'
db = db.getSiblingDB('admin');

// Tạo user admin
db.createUser({
  user: adminUser,
  pwd: adminPass,
  roles: [ { role: "root", db: "admin" } ]
});

// Chuyển sang database 'mydatabase'
db = db.getSiblingDB('mydatabase');

// Tạo collection và thêm dữ liệu mặc định vào 'mycollection'
db.mycollection.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Tony Smith", email: "tony@example.com" }
]);
