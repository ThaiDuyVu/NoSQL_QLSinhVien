using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using QLSinhVienAPI.Models;
using QLSinhVienAPI.Services;

namespace QLSinhVienAPI.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        public DashboardController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet("overview")]
        public async Task<ActionResult<DashboardOverviewDto>> GetOverview()
        {
            var collection = _mongoDbService.SinhViens;

            var studentCountResult = await collection.Aggregate()
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $count: 'value' }"))
                .FirstOrDefaultAsync();

            var classCountResult = await collection.Aggregate()
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $group: { _id: '$malop' } }"))
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $count: 'value' }"))
                .FirstOrDefaultAsync();

            var averageScoreResult = await collection.Aggregate()
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $unwind: '$monhoc' }"))
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $group: { _id: null, value: { $avg: '$monhoc.diem' } } }"))
                .FirstOrDefaultAsync();

            var genderResults = await collection.Aggregate()
                .AppendStage<BsonDocument>(BsonDocument.Parse("{ $group: { _id: '$phai', count: { $sum: 1 } } }"))
                .ToListAsync();

            var totalStudents = GetLong(studentCountResult, "value");
            var totalClasses = GetLong(classCountResult, "value");
            var averageScore = GetDouble(averageScoreResult, "value");
            var maleCount = GetGenderCount(genderResults, "Nam");
            var femaleCount = GetGenderCount(genderResults, "Nữ");

            return Ok(new DashboardOverviewDto
            {
                TotalStudents = totalStudents,
                TotalClasses = totalClasses,
                AverageScore = averageScore,
                MalePercentage = ToPercentage(maleCount, totalStudents),
                FemalePercentage = ToPercentage(femaleCount, totalStudents)
            });
        }

        [HttpGet("classes")]
        public async Task<ActionResult<IEnumerable<ClassStatisticsDto>>> GetClassStatistics()
        {
            var pipeline = new[]
            {
                BsonDocument.Parse("{ $unwind: { path: '$monhoc', preserveNullAndEmptyArrays: true } }"),
                BsonDocument.Parse("{ $group: { _id: '$_id', malop: { $first: '$malop' }, averageScore: { $avg: '$monhoc.diem' } } }"),
                BsonDocument.Parse("{ $project: { _id: 0, malop: 1, averageScore: { $ifNull: ['$averageScore', 0] } } }"),
                BsonDocument.Parse("{ $group: { _id: '$malop', studentCount: { $sum: 1 }, highestAverageScore: { $max: '$averageScore' }, lowestAverageScore: { $min: '$averageScore' } } }"),
                BsonDocument.Parse("{ $project: { _id: 0, malop: '$_id', studentCount: 1, highestAverageScore: 1, lowestAverageScore: 1 } }"),
                BsonDocument.Parse("{ $sort: { malop: 1 } }")
            };

            var results = await _mongoDbService.SinhViens.Aggregate<BsonDocument>(pipeline).ToListAsync();
            return Ok(results.Select(document => new ClassStatisticsDto
            {
                MaLop = GetString(document, "malop"),
                StudentCount = GetLong(document, "studentCount"),
                HighestAverageScore = GetDouble(document, "highestAverageScore"),
                LowestAverageScore = GetDouble(document, "lowestAverageScore")
            }));
        }

        [HttpGet("languages")]
        public async Task<ActionResult<IEnumerable<LanguageStatisticsDto>>> GetLanguageStatistics()
        {
            var pipeline = new[]
            {
                BsonDocument.Parse("{ $unwind: '$ngoaingu' }"),
                BsonDocument.Parse("{ $group: { _id: { studentId: '$_id', language: '$ngoaingu' } } }"),
                BsonDocument.Parse("{ $group: { _id: '$_id.language', studentCount: { $sum: 1 } } }"),
                BsonDocument.Parse("{ $project: { _id: 0, language: '$_id', studentCount: 1 } }"),
                BsonDocument.Parse("{ $sort: { studentCount: -1, language: 1 } }")
            };

            var results = await _mongoDbService.SinhViens.Aggregate<BsonDocument>(pipeline).ToListAsync();
            return Ok(results.Select(document => new LanguageStatisticsDto
            {
                Language = GetString(document, "language"),
                StudentCount = GetLong(document, "studentCount")
            }));
        }

        [HttpGet("top-students")]
        public async Task<ActionResult<IEnumerable<TopStudentDto>>> GetTopStudents()
        {
            var pipeline = new[]
            {
                BsonDocument.Parse("{ $unwind: { path: '$monhoc', preserveNullAndEmptyArrays: true } }"),
                BsonDocument.Parse("{ $group: { _id: '$_id', masv: { $first: '$masv' }, hoten: { $first: '$hoten' }, malop: { $first: '$malop' }, averageScore: { $avg: '$monhoc.diem' } } }"),
                BsonDocument.Parse("{ $project: { _id: 0, masv: 1, hoten: 1, malop: 1, averageScore: { $ifNull: ['$averageScore', 0] } } }"),
                BsonDocument.Parse("{ $sort: { averageScore: -1, masv: 1 } }"),
                BsonDocument.Parse("{ $limit: 5 }")
            };

            var results = await _mongoDbService.SinhViens.Aggregate<BsonDocument>(pipeline).ToListAsync();
            return Ok(results.Select(document => new TopStudentDto
            {
                MaSV = GetString(document, "masv"),
                HoTen = GetString(document, "hoten"),
                MaLop = GetString(document, "malop"),
                AverageScore = GetDouble(document, "averageScore")
            }));
        }

        [HttpGet("grade-distribution")]
        public async Task<ActionResult<IEnumerable<GradeDistributionDto>>> GetGradeDistribution()
        {
            var pipeline = new[]
            {
                BsonDocument.Parse("{ $unwind: { path: '$monhoc', preserveNullAndEmptyArrays: true } }"),
                BsonDocument.Parse("{ $group: { _id: '$_id', averageScore: { $avg: '$monhoc.diem' } } }"),
                BsonDocument.Parse("{ $project: { averageScore: { $ifNull: ['$averageScore', 0] } } }"),
                BsonDocument.Parse("{ $project: { classification: { $switch: { branches: [ { case: { $gte: ['$averageScore', 8.5] }, then: 'Xuất sắc' }, { case: { $gte: ['$averageScore', 7] }, then: 'Giỏi' }, { case: { $gte: ['$averageScore', 5.5] }, then: 'Khá' } ], default: 'Trung bình/Yếu' } } } }"),
                BsonDocument.Parse("{ $group: { _id: '$classification', studentCount: { $sum: 1 } } }"),
                BsonDocument.Parse("{ $project: { _id: 0, classification: '$_id', studentCount: 1 } }")
            };

            var results = await _mongoDbService.SinhViens.Aggregate<BsonDocument>(pipeline).ToListAsync();
            return Ok(results.Select(document => new GradeDistributionDto
            {
                Classification = GetString(document, "classification"),
                StudentCount = GetLong(document, "studentCount")
            }));
        }

        private static long GetLong(BsonDocument? document, string fieldName)
        {
            return document != null && document.TryGetValue(fieldName, out var value) && value.IsNumeric
                ? value.ToInt64()
                : 0;
        }

        private static double GetDouble(BsonDocument? document, string fieldName)
        {
            return document != null && document.TryGetValue(fieldName, out var value) && value.IsNumeric
                ? value.ToDouble()
                : 0;
        }

        private static string GetString(BsonDocument document, string fieldName)
        {
            return document.TryGetValue(fieldName, out var value) && value.IsString
                ? value.AsString
                : string.Empty;
        }

        private static long GetGenderCount(IEnumerable<BsonDocument> documents, string gender)
        {
            var document = documents.FirstOrDefault(item => GetString(item, "_id") == gender);
            return GetLong(document, "count");
        }

        private static double ToPercentage(long count, long total)
        {
            return total == 0 ? 0 : Math.Round(count * 100d / total, 2);
        }
    }
}
