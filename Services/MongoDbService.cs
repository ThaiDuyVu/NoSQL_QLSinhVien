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
        private readonly MongoClient _client;

        private readonly IMongoDatabase _database;


        // =====================================================
        // CONSTRUCTOR
        // =====================================================

        public MongoDbService(
            IOptions<MongoDbSettings> settings)
        {

            _client =
                new MongoClient(
                    settings.Value.ConnectionString
                );


            _database =
                _client.GetDatabase(
                    settings.Value.DatabaseName
                );


            /*
             * Khởi tạo Index ngay khi service được tạo.
             */

            CreateIndexesAsync()
                .GetAwaiter()
                .GetResult();
        }


        // =====================================================
        // COLLECTION
        // =====================================================

        public IMongoCollection<SinhVien> SinhViens =>
            _database.GetCollection<SinhVien>(
                "sinhvien"
            );


        // =====================================================
        // DATABASE
        // =====================================================

        public IMongoDatabase Database =>
            _database;


        // =====================================================
        // CREATE INDEX
        // =====================================================

        private async Task CreateIndexesAsync()
        {
            try
            {
                var collection =
                    SinhViens;


                // =================================================
                // 1. UNIQUE INDEX - MaSV
                // =================================================

                var masvIndexKeys =
                    Builders<SinhVien>
                        .IndexKeys
                        .Ascending(
                            s => s.MaSV
                        );


                var masvIndexOptions =
                    new CreateIndexOptions
                    {
                        Unique = true,

                        Name =
                            "Unique_MaSV"
                    };


                var masvIndexModel =
                    new CreateIndexModel<SinhVien>(
                        masvIndexKeys,
                        masvIndexOptions
                    );


                // =================================================
                // 2. COMPOUND INDEX - MaLop + HoTen
                // =================================================

                var compoundIndexKeys =
                    Builders<SinhVien>
                        .IndexKeys
                        .Ascending(
                            s => s.MaLop
                        )
                        .Ascending(
                            s => s.HoTen
                        );


                var compoundIndexOptions =
                    new CreateIndexOptions
                    {
                        Name =
                            "Compound_MaLop_HoTen"
                    };


                var compoundIndexModel =
                    new CreateIndexModel<SinhVien>(
                        compoundIndexKeys,
                        compoundIndexOptions
                    );


                // =================================================
                // CREATE INDEXES
                // =================================================

                await collection.Indexes
                    .CreateManyAsync(
                        new[]
                        {
                            masvIndexModel,
                            compoundIndexModel
                        }
                    );


                Console.WriteLine(
                    "--> [MongoDB] Khoi tao Index " +
                    "Unique(masv) va " +
                    "Compound(malop, hoten) thanh cong!"
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"--> [MongoDB] Loi khoi tao Index: {ex.Message}"
                );
            }
        }
    }
}