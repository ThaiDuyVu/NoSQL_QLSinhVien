namespace QLSinhVienAPI.Models
{
    public class DashboardOverviewDto
    {
        public long TotalStudents { get; set; }
        public long TotalClasses { get; set; }
        public double AverageScore { get; set; }
        public double MalePercentage { get; set; }
        public double FemalePercentage { get; set; }
    }

    public class ClassStatisticsDto
    {
        public string MaLop { get; set; } = string.Empty;
        public long StudentCount { get; set; }
        public double HighestAverageScore { get; set; }
        public double LowestAverageScore { get; set; }
    }

    public class LanguageStatisticsDto
    {
        public string Language { get; set; } = string.Empty;
        public long StudentCount { get; set; }
    }

    public class TopStudentDto
    {
        public string MaSV { get; set; } = string.Empty;
        public string HoTen { get; set; } = string.Empty;
        public string MaLop { get; set; } = string.Empty;
        public double AverageScore { get; set; }
    }

    public class GradeDistributionDto
    {
        public string Classification { get; set; } = string.Empty;
        public long StudentCount { get; set; }
    }
}
