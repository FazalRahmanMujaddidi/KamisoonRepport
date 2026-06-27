// using KamisoonRepport.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // Add MVC Controllers + Views
// builder.Services.AddControllersWithViews();
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("DefaultConnection")));
// // ✅ ADD API CONTROLLERS SUPPORT (important for React)
// builder.Services.AddControllers();

// // ✅ CORS (allow React frontend)
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll",
//         policy =>
//         {
//             policy.AllowAnyOrigin()
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//         });
// });

// var app = builder.Build();

// // Configure pipeline
// if (!app.Environment.IsDevelopment())
// {
//     app.UseExceptionHandler("/Home/Error");
//     app.UseHsts();
// }

// app.UseHttpsRedirection();
// app.UseStaticFiles();

// app.UseRouting();

// // ✅ Enable CORS before authorization
// app.UseCors("AllowAll");

// app.UseAuthorization();

// // MVC routes (Razor views if you still use them)
// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Home}/{action=Index}/{id?}");

// // ✅ API controllers (VERY IMPORTANT for React)
// app.MapControllers();

// app.Run();
using KamisoonRepport.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ Controllers (API only)
builder.Services.AddControllers();

// ❌ Remove MVC if you are NOT using Razor views
// builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// ✅ IMPORTANT order
app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthorization();

// API routes
app.MapControllers();

// OPTIONAL: React static hosting (if you use wwwroot)
app.UseDefaultFiles();
app.UseStaticFiles();

// React fallback routing (VERY IMPORTANT for /company /items etc)
app.MapFallbackToFile("index.html");

app.Run();