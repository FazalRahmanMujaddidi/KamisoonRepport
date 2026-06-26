using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Data;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TruckTypeController : ControllerBase
{
    private readonly AppDbContext _context;

    public TruckTypeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.TruckTypes.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var truckType = await _context.TruckTypes.FindAsync(id);

        if (truckType == null)
            return NotFound();

        return Ok(truckType);
    }

    [HttpPost]
    public async Task<IActionResult> Create(TruckType truckType)
    {
        _context.TruckTypes.Add(truckType);

        await _context.SaveChangesAsync();

        return Ok(truckType);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TruckType updated)
    {
        var truckType = await _context.TruckTypes.FindAsync(id);

        if (truckType == null)
            return NotFound();

        truckType.Name = updated.Name;

        await _context.SaveChangesAsync();

        return Ok(truckType);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var truckType = await _context.TruckTypes.FindAsync(id);

        if (truckType == null)
            return NotFound();

        _context.TruckTypes.Remove(truckType);

        await _context.SaveChangesAsync();

        return Ok();
    }
}