// Switch sang Database chuẩn của đồ án
use qlsinhvien_db;

// 1. Xóa dữ liệu cũ nếu có
db.sinhvien.drop();

// 2. Tự động khởi tạo Indexes
db.sinhvien.createIndex({ "masv": 1 }, { unique: true, name: "Unique_MaSV" });
db.sinhvien.createIndex({ "malop": 1, "hoten": 1 }, { name: "Compound_MaLop_HoTen" });

// 3. Chèn dữ liệu mẫu chuẩn (15 Sinh viên)
db.sinhvien.insertMany([
  {
    "masv": "sv001",
    "hoten": "Nguyễn Văn An",
    "tuoi": 20,
    "phai": "Nam",
    "malop": "l01",
    "ngoaingu": ["Tiếng Anh", "Tiếng Nhật"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 8.5 },
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 7.0 }
    ]
  },
  {
    "masv": "sv002",
    "hoten": "Trần Thị Bích",
    "tuoi": 21,
    "phai": "Nữ",
    "malop": "l01",
    "ngoaingu": ["Tiếng Anh", "Tiếng Trung"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 9.0 },
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 8.8 }
    ]
  },
  {
    "masv": "sv003",
    "hoten": "Lê Hoàng Cường",
    "tuoi": 22,
    "phai": "Nam",
    "malop": "l02",
    "ngoaingu": ["Tiếng Pháp"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 6.5 },
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 5.0 }
    ]
  },
  {
    "masv": "sv004",
    "hoten": "Phạm Minh Dung",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l02",
    "ngoaingu": ["Tiếng Anh", "Tiếng Hàn"],
    "monhoc": [
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 9.5 },
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 8.0 }
    ]
  },
  {
    "masv": "sv005",
    "hoten": "Hoàng Văn Em",
    "tuoi": 19,
    "phai": "Nam",
    "malop": "l01",
    "ngoaingu": ["Tiếng Anh"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 4.5 },
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 6.0 }
    ]
  },
  {
    "masv": "sv006",
    "hoten": "Đỗ Thị Giang",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l03",
    "ngoaingu": ["Tiếng Nhật", "Tiếng Đức"],
    "monhoc": [
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 7.8 },
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 8.2 }
    ]
  },
  {
    "masv": "sv007",
    "hoten": "Vũ Hải Đăng",
    "tuoi": 21,
    "phai": "Nam",
    "malop": "l03",
    "ngoaingu": ["Tiếng Anh"],
    "monhoc": [
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 3.5 },
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 5.0 }
    ]
  },
  {
    "masv": "sv008",
    "hoten": "Ngô Bích Hằng",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l02",
    "ngoaingu": ["Tiếng Anh", "Tiếng Trung"],
    "monhoc": [
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 8.5 },
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 7.5 }
    ]
  },
  {
    "masv": "sv009",
    "hoten": "Bùi Hữu Khanh",
    "tuoi": 22,
    "phai": "Nam",
    "malop": "l01",
    "ngoaingu": [],
    "monhoc": [
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 9.0 }
    ]
  },
  {
    "masv": "sv010",
    "hoten": "Đặng Lan Hương",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l03",
    "ngoaingu": ["Tiếng Anh", "Tiếng Pháp"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 8.0 },
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 8.5 }
    ]
  },
  {
    "masv": "sv011",
    "hoten": "Trịnh Quốc Long",
    "tuoi": 21,
    "phai": "Nam",
    "malop": "l02",
    "ngoaingu": ["Tiếng Nhật"],
    "monhoc": [
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 6.8 }
    ]
  },
  {
    "masv": "sv012",
    "hoten": "Lý Thị Mai",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l01",
    "ngoaingu": ["Tiếng Anh"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 7.2 },
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 7.5 }
    ]
  },
  {
    "masv": "sv013",
    "hoten": "Dương Văn Nam",
    "tuoi": 23,
    "phai": "Nam",
    "malop": "l03",
    "ngoaingu": ["Tiếng Hàn"],
    "monhoc": [
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 4.0 }
    ]
  },
  {
    "masv": "sv014",
    "hoten": "Mai Phương Thảo",
    "tuoi": 20,
    "phai": "Nữ",
    "malop": "l02",
    "ngoaingu": ["Tiếng Anh", "Tiếng Nhật"],
    "monhoc": [
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 9.2 },
      { "mamon": "csdl", "tenmon": "Cơ sở dữ liệu", "diem": 8.9 }
    ]
  },
  {
    "masv": "sv015",
    "hoten": "Nguyễn Tuấn Kiệt",
    "tuoi": 21,
    "phai": "Nam",
    "malop": "l01",
    "ngoaingu": ["Tiếng Anh"],
    "monhoc": [
      { "mamon": "laptrinh", "tenmon": "Lập trình Cơ bản", "diem": 8.1 },
      { "mamon": "nosql", "tenmon": "Cơ sở dữ liệu NoSQL", "diem": 8.4 }
    ]
  }
]);

print("--> Bootstrapped Database qlsinhvien_db, created indexes and seeded 15 documents successfully!");