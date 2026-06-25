using Microsoft.AspNetCore.Mvc;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private static List<Items> items = new List<Items>();

    // GET ALL
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(items);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var item = items.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    // CREATE
    [HttpPost]
    public IActionResult Create(Items item)
    {
        item.Id = items.Count + 1;
        items.Add(item);
        return Ok(item);
    }

    // UPDATE
    [HttpPut("{id}")]
    public IActionResult Update(int id, Items updated)
    {
        var item = items.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();

        item.Name = updated.Name;

        return Ok(item);
    }

    // DELETE
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var item = items.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();

        items.Remove(item);
        return Ok();
    }
}