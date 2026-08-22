using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace QLSinhVienAPI.Models
{
    public class SinhVien
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("masv")]
        public string MaSV { get; set; } = string.Empty;

        [BsonElement("hoten")]
        public string HoTen { get; set; } = string.Empty;

        [BsonElement("tuoi")]
        public int Tuoi { get; set; }

        [BsonElement("phai")]
        public string Phai { get; set; } = string.Empty;

        [BsonElement("malop")]
        public string MaLop { get; set; } = string.Empty;

        [BsonElement("ngoaingu")]
        public List<string> NgoaiNgu { get; set; } = new List<string>();

        [BsonElement("monhoc")]
        public List<MonHoc> MonHoc { get; set; } = new List<MonHoc>();
    }

    public class MonHoc
    {
        [BsonElement("mamon")]
        public string MaMon { get; set; } = string.Empty;

        [BsonElement("tenmon")]
        public string TenMon { get; set; } = string.Empty;

        [BsonElement("diem")]
        public double Diem { get; set; }
    }
}