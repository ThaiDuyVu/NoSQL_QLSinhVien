using QLSinhVienAPI.Configurations;
using QLSinhVienAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Bind cấu hình appsettings.json vào class MongoDbSettings
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

// 2. Đăng ký MongoDbService dưới dạng SINGLETON
builder.Services.AddSingleton<MongoDbService>();

// 3. Đăng ký Controllers (Đã sửa lại đúng cú pháp AddControllers)
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Kích hoạt khôi phục/khởi tạo MongoDbService ngay khi app bắt đầu chạy
app.Services.GetRequiredService<MongoDbService>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();