using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Data;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ItemsController(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Items>>> GetAll()
    {
        return await _context.Items
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Items>> Get(int id)
    {
        var item = await _context.Items.FindAsync(id);

        if (item == null)
            return NotFound();

        return item;
    }

    // CREATE
    [HttpPost]
    public async Task<ActionResult<Items>> Create(Items item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        return Ok(item);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Items updated)
    {
        var item = await _context.Items.FindAsync(id);

        if (item == null)
            return NotFound();

        item.Name = updated.Name;

        await _context.SaveChangesAsync();

        return Ok(item);
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Items.FindAsync(id);

        if (item == null)
            return NotFound();

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();

        return Ok();
    }
}