using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QLSinhVienAPI.Models;
using QLSinhVienAPI.Services;

namespace QLSinhVienAPI.Controllers
{
    [ApiController]
    [Route("api/advanced-sinhvien")]
    public class AdvancedSinhVienController : ControllerBase
    {
        private readonly IMongoCollection<SinhVien> _collection;

        public AdvancedSinhVienController(MongoDbService mongoDbService)
        {
            _collection = mongoDbService.SinhViens;
        }

        // =====================================================
        // 1. THÊM PHẦN TỬ VÀO MẢNG ($push / $addToSet)
        // =====================================================

        // Thêm ngoại ngữ mới (dùng $addToSet để tránh trùng lặp)
        [HttpPost("{masv}/ngoai-ngu")]
        public async Task<IActionResult> AddNgoaiNgu(
            string masv,
            [FromBody] string ngoaiNgu)
        {
            if (string.IsNullOrWhiteSpace(ngoaiNgu))
                return BadRequest(
                    "Tên ngoại ngữ không được để trống."
                );

            var update =
                Builders<SinhVien>.Update.AddToSet(
                    x => x.NgoaiNgu,
                    ngoaiNgu.Trim()
                );

            var result =
                await _collection.UpdateOneAsync(
                    x => x.MaSV == masv,
                    update
                );

            if (result.MatchedCount == 0)
                return NotFound(
                    $"Không tìm thấy sinh viên có mã '{masv}'."
                );

            return Ok(
                $"Đã bổ sung ngoại ngữ '{ngoaiNgu}' thành công."
            );
        }


        // Thêm môn học mới vào mảng (dùng $push)
        [HttpPost("{masv}/mon-hoc")]
        public async Task<IActionResult> AddMonHoc(
            string masv,
            [FromBody] MonHoc monHoc)
        {
            if (
                string.IsNullOrWhiteSpace(monHoc.MaMon) ||
                string.IsNullOrWhiteSpace(monHoc.TenMon)
            )
            {
                return BadRequest(
                    "Mã môn và Tên môn không được để trống."
                );
            }

            if (monHoc.Diem < 0 || monHoc.Diem > 10)
                return BadRequest(
                    "Điểm số phải nằm trong khoảng từ 0 đến 10."
                );

            var update =
                Builders<SinhVien>.Update.Push(
                    x => x.MonHoc,
                    monHoc
                );

            var result =
                await _collection.UpdateOneAsync(
                    x => x.MaSV == masv,
                    update
                );

            if (result.MatchedCount == 0)
                return NotFound(
                    $"Không tìm thấy sinh viên có mã '{masv}'."
                );

            return Ok(
                $"Đã thêm môn học '{monHoc.TenMon}' thành công."
            );
        }


        // =====================================================
        // 2. CẬP NHẬT PHẦN TỬ TRONG MẢNG
        //    Positional Operator $
        // =====================================================

        public class UpdateDiemDto
        {
            public double Diem { get; set; }
        }


        [HttpPut("{masv}/mon-hoc/{mamon}")]
public async Task<IActionResult> UpdateDiemMonHoc(
    string masv,
    string mamon,
    [FromBody] UpdateDiemDto dto)
{
    if (dto.Diem < 0 || dto.Diem > 10)
    {
        return BadRequest(
            "Điểm số phải nằm trong khoảng từ 0 đến 10."
        );
    }

    // Tìm sinh viên theo mã sinh viên
    // và tìm môn học có MaMon tương ứng
    var filter = Builders<SinhVien>.Filter.And(
        Builders<SinhVien>.Filter.Eq(
            x => x.MaSV,
            masv
        ),

        Builders<SinhVien>.Filter.ElemMatch(
            x => x.MonHoc,
            m => m.MaMon == mamon
        )
    );

    // MongoDB positional operator $
    var update =
        Builders<SinhVien>.Update.Set(
            "MonHoc.$.Diem",
            dto.Diem
        );

    var result =
        await _collection.UpdateOneAsync(
            filter,
            update
        );

    if (result.MatchedCount == 0)
    {
        return NotFound(
            $"Không tìm thấy sinh viên '{masv}' có môn học mã '{mamon}'."
        );
    }

    if (result.ModifiedCount == 0)
    {
        return Ok(
            "Điểm số không thay đổi (giữ nguyên giá trị cũ)."
        );
    }

    return Ok(
        $"Đã cập nhật điểm môn '{mamon}' thành công."
    );
}

        // =====================================================
        // 3. THAY THẾ DOCUMENT
        //    replaceOne theo _id
        // =====================================================

        [HttpPut("replace/{id}")]
        public async Task<IActionResult> ReplaceStudent(
            string id,
            [FromBody] SinhVien updatedSv)
        {
            var result =
                await _collection.ReplaceOneAsync(
                    x => x.Id == id,
                    updatedSv
                );


            if (result.MatchedCount == 0)
            {
                return NotFound(
                    $"Không tìm thấy document sinh viên có _id '{id}'."
                );
            }


            return Ok(
                "Thay thế toàn bộ Document (ReplaceOne) thành công."
            );
        }
        // =====================================================
// 2. XEM DANH SÁCH MÔN HỌC CỦA SINH VIÊN
//    Dựa vào mã sinh viên
// =====================================================

[HttpGet("{masv}/mon-hoc")]
public async Task<IActionResult> GetMonHocByMaSV(string masv)
{
    // Tìm sinh viên theo mã sinh viên
    var sinhVien = await _collection
        .Find(x => x.MaSV == masv)
        .FirstOrDefaultAsync();

    // Không tìm thấy sinh viên
    if (sinhVien == null)
    {
        return NotFound(
            $"Không tìm thấy sinh viên có mã '{masv}'."
        );
    }

    // Trả về danh sách môn học của sinh viên
    return Ok(sinhVien.MonHoc);
}
    }
}