using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QLSinhVienAPI.Models;
using QLSinhVienAPI.Services;

namespace QLSinhVienAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SinhVienController : ControllerBase
    {
        private readonly IMongoCollection<SinhVien> _collection;

        public SinhVienController(MongoDbService mongoDbService)
        {
            _collection = mongoDbService.SinhViens;
        }

        // ---------- CREATE ----------
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SinhVien sv)
        {
            if (sv.Tuoi <= 0)
                return BadRequest("Tuổi sinh viên phải là số nguyên dương.");

            foreach (var mon in sv.MonHoc)
            {
                if (mon.Diem < 0 || mon.Diem > 10)
                    return BadRequest($"Điểm môn '{mon.TenMon}' phải trong khoảng 0 - 10.");
            }

            try
            {
                await _collection.InsertOneAsync(sv);
                return CreatedAtAction(nameof(GetByMaSV), new { masv = sv.MaSV }, sv);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return Conflict($"Mã sinh viên '{sv.MaSV}' đã tồn tại.");
            }
        }

        // ---------- READ ----------
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _collection.Find(_ => true).ToListAsync();
            return Ok(list);
        }

        [HttpGet("{masv}")]
        public async Task<IActionResult> GetByMaSV(string masv)
        {
            var sv = await _collection.Find(x => x.MaSV == masv).FirstOrDefaultAsync();
            if (sv == null) return NotFound($"Không tìm thấy sinh viên có mã '{masv}'.");
            return Ok(sv);
        }

        [HttpGet("lop/{malop}")]
        public async Task<IActionResult> GetByMaLop(string malop)
        {
            var list = await _collection.Find(x => x.MaLop == malop)
                                         .SortBy(x => x.HoTen)
                                         .ToListAsync();
            return Ok(list);
        }

        // ---------- UPDATE ----------
        public class UpdateSinhVienDto
        {
            public string HoTen { get; set; } = string.Empty;
            public int Tuoi { get; set; }
            public string Phai { get; set; } = string.Empty;
            public string MaLop { get; set; } = string.Empty;
        }

        [HttpPut("{masv}")]
        public async Task<IActionResult> Update(string masv, [FromBody] UpdateSinhVienDto dto)
        {
            if (dto.Tuoi <= 0)
                return BadRequest("Tuổi sinh viên phải là số nguyên dương.");

            var update = Builders<SinhVien>.Update
                .Set(x => x.HoTen, dto.HoTen)
                .Set(x => x.Tuoi, dto.Tuoi)
                .Set(x => x.Phai, dto.Phai)
                .Set(x => x.MaLop, dto.MaLop);

            var result = await _collection.UpdateOneAsync(x => x.MaSV == masv, update);

            if (result.MatchedCount == 0)
                return NotFound($"Không tìm thấy sinh viên có mã '{masv}'.");

            return Ok("Cập nhật thành công.");
        }

        // ---------- DELETE ----------
        [HttpDelete("{masv}")]
        public async Task<IActionResult> DeleteOne(string masv)
        {
            var result = await _collection.DeleteOneAsync(x => x.MaSV == masv);
            if (result.DeletedCount == 0)
                return NotFound($"Không tìm thấy sinh viên có mã '{masv}'.");

            return Ok("Xóa thành công.");
        }

        [HttpDelete("lop/{malop}")]
        public async Task<IActionResult> DeleteByLop(string malop)
        {
            var result = await _collection.DeleteManyAsync(x => x.MaLop == malop);
            return Ok($"Đã xóa {result.DeletedCount} sinh viên thuộc lớp '{malop}'.");
        }

        /// <summary>
        /// DTO cho việc trả về danh sách môn học (mã môn, tên môn) của sinh viên
        /// </summary>
        public class MonHocOptionDto
        {
            public string MaMon { get; set; } = string.Empty;
            public string TenMon { get; set; } = string.Empty;
        }
        [HttpGet("mon-hoc")]
        public async Task<IActionResult> GetDanhSachMonHoc()
        {
            var sinhViens = await _collection
                .Find(_ => true)
                .Project(x => x.MonHoc)
                .ToListAsync();

            var monHocList = sinhViens
                .SelectMany(x => x)
                .GroupBy(x => x.MaMon)
                .Select(g => new MonHocOptionDto
                {
                    MaMon = g.Key,
                    TenMon = g.First().TenMon
                })
                .OrderBy(x => x.MaMon)
                .ToList();

            return Ok(monHocList);
        }
    }
}