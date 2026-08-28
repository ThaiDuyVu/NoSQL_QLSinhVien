
use qlsinhvien_db;


db.sinhvien.drop();

db.sinhvien.createIndex(
    { "masv": 1 },
    {
        unique: true,
        name: "Unique_MaSV"
    }
);

db.sinhvien.createIndex(
    { "malop": 1, "hoten": 1 },
    {
        name: "Compound_MaLop_HoTen"
    }
);



db.sinhvien.insertMany([


    {
        masv: "sv001",
        hoten: "Nguyễn Văn An",
        tuoi: 20,
        phai: "Nam",
        malop: "l01",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.2 }
        ]
    },

    {
        masv: "sv002",
        hoten: "Trần Thị Bích",
        tuoi: 21,
        phai: "Nữ",
        malop: "l01",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 9.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.8 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.5 }
        ]
    },

    {
        masv: "sv003",
        hoten: "Lê Hoàng Cường",
        tuoi: 22,
        phai: "Nam",
        malop: "l01",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 6.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 5.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 6.8 }
        ]
    },

    {
        masv: "sv004",
        hoten: "Phạm Minh Dung",
        tuoi: 20,
        phai: "Nữ",
        malop: "l01",
        ngoaingu: ["Tiếng Anh", "Tiếng Hàn"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.5 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.7 }
        ]
    },

    {
        masv: "sv005",
        hoten: "Hoàng Văn Em",
        tuoi: 19,
        phai: "Nam",
        malop: "l01",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 4.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 6.0 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 6.5 }
        ]
    },

    {
        masv: "sv006",
        hoten: "Đỗ Thị Giang",
        tuoi: 20,
        phai: "Nữ",
        malop: "l01",
        ngoaingu: ["Tiếng Nhật", "Tiếng Đức"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.2 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 7.8 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.0 }
        ]
    },

    {
        masv: "sv007",
        hoten: "Vũ Hải Đăng",
        tuoi: 21,
        phai: "Nam",
        malop: "l01",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 3.5 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 5.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 6.0 }
        ]
    },

    {
        masv: "sv008",
        hoten: "Ngô Bích Hằng",
        tuoi: 20,
        phai: "Nữ",
        malop: "l01",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.5 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.5 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.0 }
        ]
    },

    {
        masv: "sv009",
        hoten: "Bùi Hữu Khanh",
        tuoi: 22,
        phai: "Nam",
        malop: "l01",
        ngoaingu: [],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 9.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.2 }
        ]
    },

    {
        masv: "sv010",
        hoten: "Đặng Lan Hương",
        tuoi: 20,
        phai: "Nữ",
        malop: "l01",
        ngoaingu: ["Tiếng Anh", "Tiếng Pháp"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.5 }
        ]
    },


    {
        masv: "sv011",
        hoten: "Trịnh Quốc Long",
        tuoi: 21,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 6.8 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 7.5 }
        ]
    },

    {
        masv: "sv012",
        hoten: "Lý Thị Mai",
        tuoi: 20,
        phai: "Nữ",
        malop: "l02",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.2 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 7.5 },
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.0 }
        ]
    },

    {
        masv: "sv013",
        hoten: "Dương Văn Nam",
        tuoi: 23,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 4.0 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 5.5 }
        ]
    },

    {
        masv: "sv014",
        hoten: "Mai Phương Thảo",
        tuoi: 20,
        phai: "Nữ",
        malop: "l02",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 9.2 },
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.9 }
        ]
    },

    {
        masv: "sv015",
        hoten: "Nguyễn Tuấn Kiệt",
        tuoi: 21,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.1 },
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.4 }
        ]
    },

    {
        masv: "sv016",
        hoten: "Phan Minh Khoa",
        tuoi: 20,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 8.8 },
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 9.1 }
        ]
    },

    {
        masv: "sv017",
        hoten: "Nguyễn Ngọc Linh",
        tuoi: 19,
        phai: "Nữ",
        malop: "l02",
        ngoaingu: ["Tiếng Anh", "Tiếng Đức"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.5 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 8.0 }
        ]
    },

    {
        masv: "sv018",
        hoten: "Trần Đức Mạnh",
        tuoi: 22,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 7.2 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 6.8 }
        ]
    },

    {
        masv: "sv019",
        hoten: "Võ Thùy Dương",
        tuoi: 21,
        phai: "Nữ",
        malop: "l02",
        ngoaingu: ["Tiếng Anh", "Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 9.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.6 }
        ]
    },

    {
        masv: "sv020",
        hoten: "Đinh Hoàng Sơn",
        tuoi: 20,
        phai: "Nam",
        malop: "l02",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.0 },
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 7.8 }
        ]
    },

    {
        masv: "sv021",
        hoten: "Nguyễn Thị Thu Hà",
        tuoi: 20,
        phai: "Nữ",
        malop: "l03",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.5 },
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 9.0 }
        ]
    },

    {
        masv: "sv022",
        hoten: "Lê Minh Quân",
        tuoi: 21,
        phai: "Nam",
        malop: "l03",
        ngoaingu: ["Tiếng Hàn", "Tiếng Anh"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.8 },
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 8.2 }
        ]
    },

    {
        masv: "sv023",
        hoten: "Phạm Thị Ngọc",
        tuoi: 20,
        phai: "Nữ",
        malop: "l03",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 8.8 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 9.1 }
        ]
    },

    {
        masv: "sv024",
        hoten: "Nguyễn Hoàng Phúc",
        tuoi: 22,
        phai: "Nam",
        malop: "l03",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 7.0 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 7.8 }
        ]
    },

    {
        masv: "sv025",
        hoten: "Trần Mỹ Linh",
        tuoi: 19,
        phai: "Nữ",
        malop: "l03",
        ngoaingu: ["Tiếng Anh", "Tiếng Pháp"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 9.2 },
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 8.9 }
        ]
    },

    {
        masv: "sv026",
        hoten: "Bùi Thành Đạt",
        tuoi: 21,
        phai: "Nam",
        malop: "l03",
        ngoaingu: [],
        monhoc: [
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 6.5 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.0 }
        ]
    },

    {
        masv: "sv027",
        hoten: "Đặng Thị Yến",
        tuoi: 20,
        phai: "Nữ",
        malop: "l03",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 8.0 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.5 }
        ]
    },

    {
        masv: "sv028",
        hoten: "Hoàng Quốc Việt",
        tuoi: 23,
        phai: "Nam",
        malop: "l03",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 5.8 },
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 6.2 }
        ]
    },

    {
        masv: "sv029",
        hoten: "Vũ Ngọc Anh",
        tuoi: 21,
        phai: "Nữ",
        malop: "l03",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 9.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.8 }
        ]
    },

    {
        masv: "sv030",
        hoten: "Lương Gia Huy",
        tuoi: 20,
        phai: "Nam",
        malop: "l03",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.6 },
            { mamon: "httt", tenmon: "Hệ thống thông tin", diem: 8.0 }
        ]
    },


    {
        masv: "sv031",
        hoten: "Nguyễn Đức Anh",
        tuoi: 21,
        phai: "Nam",
        malop: "l04",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.0 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.5 }
        ]
    },

    {
        masv: "sv032",
        hoten: "Trần Thị Hương",
        tuoi: 20,
        phai: "Nữ",
        malop: "l04",
        ngoaingu: ["Tiếng Nhật", "Tiếng Anh"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 }
        ]
    },

    {
        masv: "sv033",
        hoten: "Lê Quốc Hùng",
        tuoi: 22,
        phai: "Nam",
        malop: "l04",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 7.5 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 7.8 }
        ]
    },

    {
        masv: "sv034",
        hoten: "Phạm Thùy Trang",
        tuoi: 20,
        phai: "Nữ",
        malop: "l04",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.2 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 9.0 }
        ]
    },

    {
        masv: "sv035",
        hoten: "Đỗ Văn Bình",
        tuoi: 21,
        phai: "Nam",
        malop: "l04",
        ngoaingu: ["Tiếng Anh", "Tiếng Đức"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 6.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.0 }
        ]
    },

    {
        masv: "sv036",
        hoten: "Ngô Thị Phương",
        tuoi: 19,
        phai: "Nữ",
        malop: "l04",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.2 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.7 }
        ]
    },

    {
        masv: "sv037",
        hoten: "Bùi Minh Hoàng",
        tuoi: 22,
        phai: "Nam",
        malop: "l04",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 5.5 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 6.0 }
        ]
    },

    {
        masv: "sv038",
        hoten: "Võ Thị Kim Oanh",
        tuoi: 21,
        phai: "Nữ",
        malop: "l04",
        ngoaingu: ["Tiếng Anh", "Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.4 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 9.1 }
        ]
    },

    {
        masv: "sv039",
        hoten: "Đinh Văn Khải",
        tuoi: 20,
        phai: "Nam",
        malop: "l04",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.2 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 7.8 }
        ]
    },

    {
        masv: "sv040",
        hoten: "Lý Ngọc Mai",
        tuoi: 20,
        phai: "Nữ",
        malop: "l04",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.9 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.6 }
        ]
    },

    {
        masv: "sv041",
        hoten: "Nguyễn Thành Trung",
        tuoi: 21,
        phai: "Nam",
        malop: "l05",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.8 }
        ]
    },

    {
        masv: "sv042",
        hoten: "Trần Thị Như Quỳnh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l05",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 9.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.2 }
        ]
    },

    {
        masv: "sv043",
        hoten: "Lê Văn Phát",
        tuoi: 22,
        phai: "Nam",
        malop: "l05",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 6.8 }
        ]
    },

    {
        masv: "sv044",
        hoten: "Phạm Ngọc Diệp",
        tuoi: 20,
        phai: "Nữ",
        malop: "l05",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 9.3 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.8 }
        ]
    },

    {
        masv: "sv045",
        hoten: "Hoàng Minh Tuấn",
        tuoi: 21,
        phai: "Nam",
        malop: "l05",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 6.2 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.0 }
        ]
    },

    {
        masv: "sv046",
        hoten: "Đỗ Minh Anh",
        tuoi: 19,
        phai: "Nữ",
        malop: "l05",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.0 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.5 }
        ]
    },

    {
        masv: "sv047",
        hoten: "Vũ Quốc Bảo",
        tuoi: 23,
        phai: "Nam",
        malop: "l05",
        ngoaingu: [],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 5.0 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 5.5 }
        ]
    },

    {
        masv: "sv048",
        hoten: "Ngô Thùy Linh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l05",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 9.1 },
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.6 }
        ]
    },

    {
        masv: "sv049",
        hoten: "Bùi Đức Thành",
        tuoi: 21,
        phai: "Nam",
        malop: "l05",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.7 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.9 }
        ]
    },

    {
        masv: "sv050",
        hoten: "Đặng Thị Lan",
        tuoi: 20,
        phai: "Nữ",
        malop: "l05",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 }
        ]
    },

    {
        masv: "sv051",
        hoten: "Nguyễn Hoàng Nam",
        tuoi: 21,
        phai: "Nam",
        malop: "l06",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 9.0 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.5 }
        ]
    },

    {
        masv: "sv052",
        hoten: "Trần Ngọc Hân",
        tuoi: 20,
        phai: "Nữ",
        malop: "l06",
        ngoaingu: ["Tiếng Nhật", "Tiếng Anh"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 8.8 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 9.1 }
        ]
    },

    {
        masv: "sv053",
        hoten: "Lê Minh Đức",
        tuoi: 22,
        phai: "Nam",
        malop: "l06",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 7.5 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.8 }
        ]
    },

    {
        masv: "sv054",
        hoten: "Phạm Thị Thanh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l06",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 9.4 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.7 }
        ]
    },

    {
        masv: "sv055",
        hoten: "Hoàng Anh Dũng",
        tuoi: 21,
        phai: "Nam",
        malop: "l06",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 6.5 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.0 }
        ]
    },

    {
        masv: "sv056",
        hoten: "Đỗ Thị Kim Chi",
        tuoi: 19,
        phai: "Nữ",
        malop: "l06",
        ngoaingu: ["Tiếng Anh", "Tiếng Đức"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 8.2 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.0 }
        ]
    },

    {
        masv: "sv057",
        hoten: "Vũ Thành Long",
        tuoi: 23,
        phai: "Nam",
        malop: "l06",
        ngoaingu: [],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 5.5 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 6.0 }
        ]
    },

    {
        masv: "sv058",
        hoten: "Ngô Mai Phương",
        tuoi: 20,
        phai: "Nữ",
        malop: "l06",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 8.9 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.4 }
        ]
    },

    {
        masv: "sv059",
        hoten: "Bùi Văn Hòa",
        tuoi: 21,
        phai: "Nam",
        malop: "l06",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 7.2 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.6 }
        ]
    },

    {
        masv: "sv060",
        hoten: "Đặng Thị Minh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l06",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "antoan", tenmon: "An toàn thông tin", diem: 9.2 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.9 }
        ]
    },

    {
        masv: "sv061",
        hoten: "Nguyễn Quốc Khánh",
        tuoi: 21,
        phai: "Nam",
        malop: "l07",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 9.5 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 8.8 }
        ]
    },

    {
        masv: "sv062",
        hoten: "Trần Thị Hồng",
        tuoi: 20,
        phai: "Nữ",
        malop: "l07",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.9 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.5 }
        ]
    },

    {
        masv: "sv063",
        hoten: "Lê Anh Tuấn",
        tuoi: 22,
        phai: "Nam",
        malop: "l07",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 7.2 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 7.8 }
        ]
    },

    {
        masv: "sv064",
        hoten: "Phạm Ngọc Anh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l07",
        ngoaingu: ["Tiếng Anh", "Tiếng Pháp"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 9.3 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.7 }
        ]
    },

    {
        masv: "sv065",
        hoten: "Hoàng Văn Hùng",
        tuoi: 21,
        phai: "Nam",
        malop: "l07",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 6.8 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 7.0 }
        ]
    },

    {
        masv: "sv066",
        hoten: "Đỗ Thùy Dung",
        tuoi: 19,
        phai: "Nữ",
        malop: "l07",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.6 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 8.2 }
        ]
    },

    {
        masv: "sv067",
        hoten: "Vũ Minh Hoàng",
        tuoi: 22,
        phai: "Nam",
        malop: "l07",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 5.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 6.5 }
        ]
    },

    {
        masv: "sv068",
        hoten: "Ngô Thị Hà",
        tuoi: 20,
        phai: "Nữ",
        malop: "l07",
        ngoaingu: ["Tiếng Nhật", "Tiếng Anh"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 9.1 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 9.0 }
        ]
    },

    {
        masv: "sv069",
        hoten: "Bùi Quốc Cường",
        tuoi: 21,
        phai: "Nam",
        malop: "l07",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 7.8 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.4 }
        ]
    },

    {
        masv: "sv070",
        hoten: "Đinh Thị Ngân",
        tuoi: 20,
        phai: "Nữ",
        malop: "l07",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "ai", tenmon: "Trí tuệ nhân tạo", diem: 8.8 },
            { mamon: "ctdl", tenmon: "Cấu trúc dữ liệu và giải thuật", diem: 8.5 }
        ]
    },

    {
        masv: "sv071",
        hoten: "Nguyễn Minh Tâm",
        tuoi: 21,
        phai: "Nam",
        malop: "l08",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 8.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 }
        ]
    },

    {
        masv: "sv072",
        hoten: "Trần Thị Tuyết",
        tuoi: 20,
        phai: "Nữ",
        malop: "l08",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 9.0 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.5 }
        ]
    },

    {
        masv: "sv073",
        hoten: "Lê Đức Thịnh",
        tuoi: 22,
        phai: "Nam",
        malop: "l08",
        ngoaingu: ["Tiếng Trung"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 7.0 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 7.5 }
        ]
    },

    {
        masv: "sv074",
        hoten: "Phạm Thị Ngọc Mai",
        tuoi: 20,
        phai: "Nữ",
        malop: "l08",
        ngoaingu: ["Tiếng Hàn", "Tiếng Anh"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 8.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.9 }
        ]
    },

    {
        masv: "sv075",
        hoten: "Hoàng Quốc Đạt",
        tuoi: 21,
        phai: "Nam",
        malop: "l08",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 6.5 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 6.8 }
        ]
    },

    {
        masv: "sv076",
        hoten: "Đỗ Thanh Thảo",
        tuoi: 19,
        phai: "Nữ",
        malop: "l08",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 8.2 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 }
        ]
    },

    {
        masv: "sv077",
        hoten: "Vũ Văn Duy",
        tuoi: 22,
        phai: "Nam",
        malop: "l08",
        ngoaingu: [],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 5.5 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 6.0 }
        ]
    },

    {
        masv: "sv078",
        hoten: "Ngô Bảo Ngọc",
        tuoi: 20,
        phai: "Nữ",
        malop: "l08",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 9.2 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.8 }
        ]
    },

    {
        masv: "sv079",
        hoten: "Bùi Thanh Sơn",
        tuoi: 21,
        phai: "Nam",
        malop: "l08",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 7.7 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.5 }
        ]
    },

    {
        masv: "sv080",
        hoten: "Đặng Thị Hạnh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l08",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "ktmt", tenmon: "Kỹ thuật máy tính", diem: 8.6 },
            { mamon: "mang", tenmon: "Mạng máy tính", diem: 8.4 }
        ]
    },


    {
        masv: "sv081",
        hoten: "Nguyễn Hải Nam",
        tuoi: 21,
        phai: "Nam",
        malop: "l09",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 9.2 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.8 }
        ]
    },

    {
        masv: "sv082",
        hoten: "Trần Thị Kim",
        tuoi: 20,
        phai: "Nữ",
        malop: "l09",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.5 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.0 }
        ]
    },

    {
        masv: "sv083",
        hoten: "Lê Thành Công",
        tuoi: 22,
        phai: "Nam",
        malop: "l09",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 7.5 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.8 }
        ]
    },

    {
        masv: "sv084",
        hoten: "Phạm Thị Hoài",
        tuoi: 20,
        phai: "Nữ",
        malop: "l09",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 9.5 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.0 }
        ]
    },

    {
        masv: "sv085",
        hoten: "Hoàng Đức Minh",
        tuoi: 21,
        phai: "Nam",
        malop: "l09",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 6.8 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 7.0 }
        ]
    },

    {
        masv: "sv086",
        hoten: "Đỗ Ngọc Thúy",
        tuoi: 19,
        phai: "Nữ",
        malop: "l09",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.7 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.5 }
        ]
    },

    {
        masv: "sv087",
        hoten: "Vũ Anh Khoa",
        tuoi: 22,
        phai: "Nam",
        malop: "l09",
        ngoaingu: [],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 5.5 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 6.0 }
        ]
    },

    {
        masv: "sv088",
        hoten: "Ngô Thị Minh Châu",
        tuoi: 20,
        phai: "Nữ",
        malop: "l09",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 9.0 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 8.8 }
        ]
    },

    {
        masv: "sv089",
        hoten: "Bùi Văn Tùng",
        tuoi: 21,
        phai: "Nam",
        malop: "l09",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 7.9 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.0 }
        ]
    },

    {
        masv: "sv090",
        hoten: "Đặng Ngọc Lan",
        tuoi: 20,
        phai: "Nữ",
        malop: "l09",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "web", tenmon: "Lập trình Web", diem: 8.8 },
            { mamon: "cnpm", tenmon: "Công nghệ phần mềm", diem: 9.1 }
        ]
    },


    {
        masv: "sv091",
        hoten: "Nguyễn Tuấn Anh",
        tuoi: 21,
        phai: "Nam",
        malop: "l10",
        ngoaingu: ["Tiếng Anh"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 9.0 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.5 }
        ]
    },

    {
        masv: "sv092",
        hoten: "Trần Thị Mai",
        tuoi: 20,
        phai: "Nữ",
        malop: "l10",
        ngoaingu: ["Tiếng Nhật"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 8.8 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.0 }
        ]
    },

    {
        masv: "sv093",
        hoten: "Lê Minh Khôi",
        tuoi: 22,
        phai: "Nam",
        malop: "l10",
        ngoaingu: ["Tiếng Hàn"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 7.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.8 }
        ]
    },

    {
        masv: "sv094",
        hoten: "Phạm Thị Ngân",
        tuoi: 20,
        phai: "Nữ",
        malop: "l10",
        ngoaingu: ["Tiếng Anh", "Tiếng Trung"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 9.4 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 9.0 }
        ]
    },

    {
        masv: "sv095",
        hoten: "Hoàng Văn Thành",
        tuoi: 21,
        phai: "Nam",
        malop: "l10",
        ngoaingu: ["Tiếng Pháp"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 6.5 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 7.0 }
        ]
    },

    {
        masv: "sv096",
        hoten: "Đỗ Thị Thanh Huyền",
        tuoi: 19,
        phai: "Nữ",
        malop: "l10",
        ngoaingu: ["Tiếng Đức"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 8.6 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.4 }
        ]
    },

    {
        masv: "sv097",
        hoten: "Vũ Đức Long",
        tuoi: 22,
        phai: "Nam",
        malop: "l10",
        ngoaingu: [],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 5.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 6.2 }
        ]
    },

    {
        masv: "sv098",
        hoten: "Ngô Thị Khánh Linh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l10",
        ngoaingu: ["Tiếng Anh", "Tiếng Nhật"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 9.1 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.9 }
        ]
    },

    {
        masv: "sv099",
        hoten: "Bùi Minh Tân",
        tuoi: 21,
        phai: "Nam",
        malop: "l10",
        ngoaingu: ["Tiếng Tây Ban Nha"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 7.8 },
            { mamon: "laptrinh", tenmon: "Lập trình Cơ bản", diem: 8.0 }
        ]
    },

    {
        masv: "sv100",
        hoten: "Đặng Thị Phương Anh",
        tuoi: 20,
        phai: "Nữ",
        malop: "l10",
        ngoaingu: ["Tiếng Anh", "Tiếng Pháp"],
        monhoc: [
            { mamon: "mobile", tenmon: "Lập trình ứng dụng di động", diem: 9.3 },
            { mamon: "csdl", tenmon: "Cơ sở dữ liệu", diem: 8.7 }
        ]
    }

]);


print("============================================================");
print("BOOTSTRAP DATABASE THÀNH CÔNG");
print("============================================================");
print("Database : " + db.getName());
print("Collection: sinhvien");
print("So luong sinh vien: " + db.sinhvien.countDocuments());
print("============================================================");

print("Danh sach Index:");
db.sinhvien.getIndexes();


print("============================================================");
print("THONG KE SINH VIEN THEO LOP");
print("============================================================");

db.sinhvien.aggregate([
    {
        $group: {
            _id: "$malop",
            soSinhVien: { $sum: 1 }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);


print("============================================================");
print("THONG KE SINH VIEN THEO GIOI TINH");
print("============================================================");

db.sinhvien.aggregate([
    {
        $group: {
            _id: "$phai",
            soSinhVien: { $sum: 1 }
        }
    }
]);



print("============================================================");
print("THONG KE NGOAI NGU");
print("============================================================");

db.sinhvien.aggregate([
    {
        $unwind: "$ngoaingu"
    },
    {
        $group: {
            _id: "$ngoaingu",
            soSinhVien: { $sum: 1 }
        }
    },
    {
        $sort: {
            soSinhVien: -1
        }
    }
]);

print("============================================================");
print("--> Database qlsinhvien_db da duoc khoi tao.");
print("--> Da tao indexes.");
print("--> Da them 100 sinh vien.");
print("--> Du lieu lop: 10 lop CNTT.");
print("--> Du lieu ngoai ngu: 7 ngon ngu.");
print("============================================================");