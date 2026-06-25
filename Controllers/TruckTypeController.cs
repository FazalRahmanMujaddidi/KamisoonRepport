using Microsoft.AspNetCore.Mvc;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TruckTypeController : ControllerBase
{
    private static List<TruckType> truckTypes = new List<TruckType>();

    // GET ALL
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(truckTypes);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var item = truckTypes.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    // CREATE
    [HttpPost]
    public IActionResult Create(TruckType truckType)
    {
        truckType.Id = truckTypes.Count + 1;
        truckTypes.Add(truckType);
        return Ok(truckType);
    }

    // UPDATE
    [HttpPut("{id}")]
    public IActionResult Update(int id, TruckType updated)
    {
        var item = truckTypes.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();

        item.Name = updated.Name;

        return Ok(item);
    }

    // DELETE
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var item = truckTypes.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();

        truckTypes.Remove(item);
        return Ok();
    }
}