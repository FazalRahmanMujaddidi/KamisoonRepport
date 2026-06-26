namespace KamisoonRepport.Models.Dto
{
    public class CompanyReportDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string ProvinceName { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public int TotalQuantity { get; set; }
       public int SmallTruckTotal { get; set; }
        public int BigTruckTotal { get; set; }
        public string ReportDateShamsi { get; set; } = string.Empty;
    }
}