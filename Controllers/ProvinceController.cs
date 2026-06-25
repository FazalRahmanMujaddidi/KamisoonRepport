using Microsoft.AspNetCore.Mvc;
using KamisoonRepport.Models;

namespace KamisoonRepport.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProvinceController : ControllerBase
{
    private static List<Province> provinces = new List<Province>();

    // GET ALL
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(provinces);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var province = provinces.FirstOrDefault(x => x.Id == id);
        if (province == null) return NotFound();
        return Ok(province);
    }

    // CREATE
    [HttpPost]
    public IActionResult Create(Province province)
    {
        province.Id = provinces.Count + 1;
        provinces.Add(province);
        return Ok(province);
    }

    // UPDATE
    [HttpPut("{id}")]
    public IActionResult Update(int id, Province updated)
    {
        var province = provinces.FirstOrDefault(x => x.Id == id);
        if (province == null) return NotFound();

        province.Name = updated.Name;
        return Ok(province);
    }

    // DELETE
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var province = provinces.FirstOrDefault(x => x.Id == id);
        if (province == null) return NotFound();

        provinces.Remove(province);
        return Ok();
    }
}