using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Data;
using KamisoonRepport.Models;
using KamisoonRepport.Models.Dto;
using System.Globalization;
using ClosedXML.Excel;
using System.IO;
namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReportController(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL REPORTS
    [HttpGet]
public async Task<IActionResult> GetAll(string order = "desc")
{
    var pc = new PersianCalendar();

    var data = await _context.Reports
        .Include(x => x.Company)
        .Include(x => x.Province)
        .Include(x => x.Items)
        .ToListAsync();

    var result = data
        .GroupBy(r => new
        {
            r.CompanyId,
            r.ProvinceId,
            r.ItemId
        })
        .Select(g => new
        {
            Id = g.First().Id,
            CompanyName = g.First().Company!.Name,
            ProvinceName = g.First().Province!.Name,
            ItemName = g.First().Items!.Name,
            SmallTruckCount = g.Sum(x => x.SmallTruckCount),
            BigTruckCount = g.Sum(x => x.BigTruckCount),
            TotalQuantity = g.Sum(x => x.Quantity),

            ReportDate = g.Max(x => x.ReportDate)
        });

    // ✅ SORT HERE
    result = order.ToLower() == "asc"
        ? result.OrderBy(x => x.ReportDate)
        : result.OrderByDescending(x => x.ReportDate);

    return Ok(result.ToList());
}
// [HttpGet]
// public async Task<IActionResult> GetAll()
// {
//     var pc = new PersianCalendar();

//     var data = await _context.Reports
//         .Include(x => x.Company)
//         .Include(x => x.Province)
//         .Include(x => x.Items)
//         .Include(x => x.TruckType)
//         .ToListAsync();

//     var result = data
//         .GroupBy(r => new
//         {
//             r.CompanyId,
//             r.ProvinceId,
//             r.ItemId
//         })
//         .Select(g => new
//         {
//             Id = g.First().Id,
//             CompanyName = g.First().Company!.Name,
//             ProvinceName = g.First().Province!.Name,
//             ItemName = g.First().Items!.Name,
//     SmallTruckCount = g.Sum(x => x.SmallTruckCount),
//     BigTruckCount = g.Sum(x => x.BigTruckCount),

//     TotalQuantity = g.Sum(x => x.Quantity),
//             ReportDateShamsi =
//                 $"{pc.GetYear(g.Max(x => x.ReportDate))}/" +
//                 $"{pc.GetMonth(g.Max(x => x.ReportDate)):00}/" +
//                 $"{pc.GetDayOfMonth(g.Max(x => x.ReportDate)):00}"
//         });
        

//     return Ok(result);
// }


[HttpGet("company-report")]
public async Task<IActionResult> GetCompanyReport(
    int? companyId,
    int? month,
    int? year)
{
    var reports = await _context.Reports
        .Include(r => r.Company)
        .Include(r => r.Province)
        .Include(r => r.Items)
        .ToListAsync();

    var pc = new PersianCalendar();

    // FILTERS
    if (companyId.HasValue)
    {
        reports = reports
            .Where(r => r.CompanyId == companyId)
            .ToList();
    }

    if (month.HasValue)
    {
        reports = reports
            .Where(r => pc.GetMonth(r.ReportDate) == month)
            .ToList();
    }

    if (year.HasValue)
    {
        reports = reports
            .Where(r => pc.GetYear(r.ReportDate) == year)
            .ToList();
    }

    // GROUP + RESULT
    var result = reports
        .GroupBy(r => new
        {
            Company = r.Company!.Name,
            Province = r.Province!.Name,
            Item = r.Items!.Name
        })
        .Select(g =>
        {
            var latestDate = g.Max(x => x.ReportDate);

            return new CompanyReportDto
            {
                CompanyName = g.Key.Company,
                ProvinceName = g.Key.Province,
                ItemName = g.Key.Item,

                // totals
                TotalQuantity = g.Sum(x => x.Quantity),
                SmallTruckTotal = g.Sum(x => x.SmallTruckCount),
                BigTruckTotal = g.Sum(x => x.BigTruckCount),

                // latest shamsi date
                ReportDateShamsi =
                    $"{pc.GetYear(latestDate)}/" +
                    $"{pc.GetMonth(latestDate):00}/" +
                    $"{pc.GetDayOfMonth(latestDate):00}"
            };
        })
        .ToList();

    return Ok(result);
}
[HttpPost]
public async Task<IActionResult> Create(Report report)
{
    var now = DateTime.Now;

    report.ReportDate = now;

    var pc = new PersianCalendar();

    report.ReportDateShamsi =
        $"{pc.GetYear(now)}/" +
        $"{pc.GetMonth(now):00}/" +
        $"{pc.GetDayOfMonth(now):00}";

    var existingReport = await _context.Reports
        .FirstOrDefaultAsync(x =>
            x.CompanyId == report.CompanyId &&
            x.ProvinceId == report.ProvinceId &&
            x.ItemId == report.ItemId &&
            x.ReportDateShamsi == report.ReportDateShamsi);

    if (existingReport != null)
    {
        existingReport.Quantity += report.Quantity;

        if (report.TruckTypeId == 1) // کوچنی لاری
            existingReport.SmallTruckCount++;

        if (report.TruckTypeId == 2) // غټی لاری
            existingReport.BigTruckCount++;

        await _context.SaveChangesAsync();

        return Ok(existingReport);
    }

    if (report.TruckTypeId == 1)
        report.SmallTruckCount = 1;

    if (report.TruckTypeId == 2)
        report.BigTruckCount = 1;

    _context.Reports.Add(report);

    await _context.SaveChangesAsync();

    return Ok(report);
}
[HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    var report = await _context.Reports.FindAsync(id);

    if (report == null)
        return NotFound();

    return Ok(report);
}
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, Report updated)
{
    var report = await _context.Reports.FindAsync(id);

    if (report == null)
        return NotFound();

    var pc = new PersianCalendar();

    var shamsiDate =
        $"{pc.GetYear(DateTime.Now)}/" +
        $"{pc.GetMonth(DateTime.Now):00}/" +
        $"{pc.GetDayOfMonth(DateTime.Now):00}";

    // Check if another grouped record already exists
    var existingReport = await _context.Reports
        .FirstOrDefaultAsync(x =>
            x.Id != id &&
            x.CompanyId == updated.CompanyId &&
            x.ProvinceId == updated.ProvinceId &&
            x.ItemId == updated.ItemId &&
            x.TruckTypeId == updated.TruckTypeId &&
            x.ReportDateShamsi == shamsiDate);

    if (existingReport != null)
    {
        existingReport.Quantity += updated.Quantity;

        if (updated.TruckTypeId == 1)
            existingReport.SmallTruckCount += 1;
        else if (updated.TruckTypeId == 2)
            existingReport.BigTruckCount += 1;

        _context.Reports.Remove(report);

        await _context.SaveChangesAsync();

        return Ok(new { Message = "Merged Successfully" });
    }

    // -----------------------------
    // NORMAL UPDATE (FIXED LOGIC)
    // -----------------------------

    int oldTruckType = report.TruckTypeId;

    report.CompanyId = updated.CompanyId;
    report.ProvinceId = updated.ProvinceId;
    report.ItemId = updated.ItemId;
    report.TruckTypeId = updated.TruckTypeId;
    report.Quantity = updated.Quantity;

    report.ReportDate = DateTime.Now;
    report.ReportDateShamsi = shamsiDate;

    // -----------------------------
    // FIX: Proper transfer logic
    // -----------------------------
    if (oldTruckType != updated.TruckTypeId)
    {
        // Small → Big
        if (oldTruckType == 1 && updated.TruckTypeId == 2)
        {
            if (report.SmallTruckCount > 0)
                report.SmallTruckCount -= 1;

            report.BigTruckCount += 1;
        }

        // Big → Small
        else if (oldTruckType == 2 && updated.TruckTypeId == 1)
        {
            if (report.BigTruckCount > 0)
                report.BigTruckCount -= 1;

            report.SmallTruckCount += 1;
        }
    }

    await _context.SaveChangesAsync();

    return Ok(report);
}
    // DELETE REPORT
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var report = await _context.Reports.FindAsync(id);

        if (report == null)
            return NotFound();

        _context.Reports.Remove(report);
        await _context.SaveChangesAsync();

        return Ok();
    }
    [HttpGet("export-excel")]
public async Task<IActionResult> ExportExcel(
    int? companyId,
    int? month,
    int? year)
{
    var reports = await _context.Reports
        .Include(r => r.Company)
        .Include(r => r.Province)
        .Include(r => r.Items)
        .ToListAsync();

    var pc = new PersianCalendar();

    // FILTERS
    if (companyId.HasValue)
        reports = reports.Where(r => r.CompanyId == companyId).ToList();

    if (month.HasValue)
        reports = reports.Where(r => pc.GetMonth(r.ReportDate) == month).ToList();

    if (year.HasValue)
        reports = reports.Where(r => pc.GetYear(r.ReportDate) == year).ToList();

    var grouped = reports
.GroupBy(r => new
{
    CompanyName = r.Company!.Name,
    ProvinceName = r.Province!.Name,
    ItemName = r.Items!.Name
})
.Select(g => new
{
    Company = g.Key.CompanyName,
    Province = g.Key.ProvinceName,
    Item = g.Key.ItemName,

    SmallTruck = g.Sum(x => x.SmallTruckCount),
    BigTruck = g.Sum(x => x.BigTruckCount),
    Total = g.Sum(x => x.Quantity)
})
        .ToList();

    using var workbook = new XLWorkbook();
    var worksheet = workbook.Worksheets.Add("Report");

    // HEADER
    worksheet.Cell(1, 1).Value = "Company";
    worksheet.Cell(1, 2).Value = "Province";
    worksheet.Cell(1, 3).Value = "Item";
    worksheet.Cell(1, 4).Value = "Small Truck";
    worksheet.Cell(1, 5).Value = "Big Truck";
    worksheet.Cell(1, 6).Value = "Total";

    int row = 2;

    foreach (var item in grouped)
    {
        worksheet.Cell(row, 1).Value = item.Company;
        worksheet.Cell(row, 2).Value = item.Province;
        worksheet.Cell(row, 3).Value = item.Item;
        worksheet.Cell(row, 4).Value = item.SmallTruck;
        worksheet.Cell(row, 5).Value = item.BigTruck;
        worksheet.Cell(row, 6).Value = item.Total;
        row++;
    }

    using var stream = new MemoryStream();
    workbook.SaveAs(stream);
    var content = stream.ToArray();

    return File(
        content,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "CompanyReport.xlsx"
    );
}
}