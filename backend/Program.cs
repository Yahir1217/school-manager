using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// 🔑 Leer cadena de conexión desde appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// ⚠️ Probar conexión manualmente para debug
try
{
    using var testConnection = new MySqlConnection(connectionString);
    testConnection.Open();
    Console.WriteLine("✅ Conexión a la base de datos exitosa");
    testConnection.Close();
}
catch (Exception ex)
{
    Console.WriteLine("❌ Error al conectar a la base de datos:");
    Console.WriteLine(ex.Message);
}

// 💾 Configurar DbContext con MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ➕ Registrar servicios propios
builder.Services.AddScoped<AuthService>();

// 📦 Agregar servicios para controladores
builder.Services.AddControllers();

// 📦 Agregar Swagger para documentación
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔐 Configurar CORS para React
var corsPolicyName = "AllowReactApp";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ✅ Ejecutar seed de datos iniciales dentro de un scope
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    Console.WriteLine("Seed: Iniciando inicialización...");
    DbInitializer.Initialize(context);
}

// 📦 Usar Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🛡 Usar HTTPS redirection
app.UseHttpsRedirection();

// 🛡 Usar CORS (importante hacerlo antes de mapear controladores)
app.UseCors(corsPolicyName);

// (opcional) Autorización si tienes [Authorize]
app.UseAuthorization();

// 🚀 Mapear controladores
app.MapControllers();

// ✅ Arrancar la aplicación
app.Run();
