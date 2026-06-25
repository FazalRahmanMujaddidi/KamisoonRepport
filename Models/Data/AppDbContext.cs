using Microsoft.EntityFrameworkCore;
using KamisoonRepport.Models;

namespace KamisoonRepport.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Province> Provinces { get; set; }
    public DbSet<Items> Items { get; set; }
    public DbSet<TruckType> TruckTypes { get; set; }
}