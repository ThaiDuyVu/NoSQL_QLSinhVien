using Microsoft.AspNetCore.Mvc;
using QLSinhVienAPI.Services;

namespace QLSinhVienAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestConnectionController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        public TestConnectionController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet("status")]
        public IActionResult CheckStatus()
        {
            var collectionName = _mongoDbService.SinhViens.CollectionNamespace.CollectionName;
            return Ok(new { Message = "Ket noi MongoDB Singleton thanh cong!", Collection = collectionName });
        }
    }
}