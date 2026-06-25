using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Data;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    private readonly AppDbContext _context;

    public CompanyController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetAll()
    {
        return await _context.Companies
            .OrderBy(x => x.Name)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> Get(int id)
    {
        var company = await _context.Companies.FindAsync(id);

        if (company == null)
            return NotFound();

        return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> Create(Company company)
    {
        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        return Ok(company);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Company company)
    {
        var existing = await _context.Companies.FindAsync(id);

        if (existing == null)
            return NotFound();

        existing.Name = company.Name;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var company = await _context.Companies.FindAsync(id);

        if (company == null)
            return NotFound();

        _context.Companies.Remove(company);

        await _context.SaveChangesAsync();

        return Ok();
    }
}