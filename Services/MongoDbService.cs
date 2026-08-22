using Microsoft.Extensions.Options;
using MongoDB.Driver;
using QLSinhVienAPI.Configurations;
using QLSinhVienAPI.Models;
using System;
using System.Threading.Tasks;

namespace QLSinhVienAPI.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        // Singleton Pattern: MongoClient chỉ khởi tạo 1 lần duy nhất trong toàn bộ App
        public MongoDbService(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);

            // Tự động kích hoạt khởi tạo Index ngay khi Service được DI container gọi
            CreateIndexesAsync().GetAwaiter().GetResult();
        }

        public IMongoCollection<SinhVien> SinhViens => 
            _database.GetCollection<SinhVien>("sinhvien");

        public IMongoDatabase Database => _database;

        /// <summary>
        /// Khởi tạo các Index bắt buộc theo đề bài
        /// </summary>
        private async Task CreateIndexesAsync()
        {
            try
            {
                var collection = SinhViens;

                // 1. Unique Index cho trường 'masv'
                var masvIndexKeys = Builders<SinhVien>.IndexKeys.Ascending(s => s.MaSV);
                var masvIndexOptions = new CreateIndexOptions { Unique = true, Name = "Unique_MaSV" };
                var masvIndexModel = new CreateIndexModel<SinhVien>(masvIndexKeys, masvIndexOptions);

                // 2. Compound Index cho cặp trường { malop: 1, hoten: 1 }
                var compoundIndexKeys = Builders<SinhVien>.IndexKeys
                    .Ascending(s => s.MaLop)
                    .Ascending(s => s.HoTen);
                var compoundIndexOptions = new CreateIndexOptions { Name = "Compound_MaLop_HoTen" };
                var compoundIndexModel = new CreateIndexModel<SinhVien>(compoundIndexKeys, compoundIndexOptions);

                // Thực thi tạo Index
                await collection.Indexes.CreateManyAsync(new[] { masvIndexModel, compoundIndexModel });
                Console.WriteLine("--> [MongoDB] Khoi tao Index Unique(masv) va Compound(malop, hoten) thanh cong!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"--> [MongoDB] Loi khoi tao Index: {ex.Message}");
            }
        }
    }
}