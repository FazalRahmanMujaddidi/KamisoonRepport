using System.ComponentModel.DataAnnotations.Schema;
namespace KamisoonRepport.Models;

public class Report
{
    public int Id { get; set; }

    public int CompanyId { get; set; }
    public Company? Company { get; set; }

    public int ProvinceId { get; set; }
    public Province? Province { get; set; }

    public int ItemId { get; set; }

    [ForeignKey(nameof(ItemId))]
    public Items? Items { get; set; }

    public int TruckTypeId { get; set; }
    public TruckType? TruckType { get; set; }
public int SmallTruckCount { get; set; }
public int BigTruckCount { get; set; }
    public int Quantity { get; set; }
        // ✅ Gregorian (System Date)
    public DateTime ReportDate { get; set; }

    // ⭐ NEW: optional Shamsi string (store or calculate)
    public string? ReportDateShamsi { get; set; }

}