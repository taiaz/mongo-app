db = connect("mongodb://localhost:27017/admin");

db = db.getSiblingDB('mydatabase');  // Tạo database mới tên là 'mydatabase'

// Tạo collection và thêm dữ liệu mặc định
db.mycollection.insertMany([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" }
]);
