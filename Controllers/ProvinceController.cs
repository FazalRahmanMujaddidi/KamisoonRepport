using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Data;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProvinceController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProvinceController(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Provinces.ToListAsync());
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var province = await _context.Provinces.FindAsync(id);

        if (province == null)
            return NotFound();

        return Ok(province);
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> Create(Province province)
    {
        _context.Provinces.Add(province);

        await _context.SaveChangesAsync();

        return Ok(province);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Province updated)
    {
        var province = await _context.Provinces.FindAsync(id);

        if (province == null)
            return NotFound();

        province.Name = updated.Name;

        await _context.SaveChangesAsync();

        return Ok(province);
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var province = await _context.Provinces.FindAsync(id);

        if (province == null)
            return NotFound();

        _context.Provinces.Remove(province);

        await _context.SaveChangesAsync();

        return Ok();
    }
}