using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using System.Text;
using System.Security.Claims; // 👈

var builder = WebApplication.CreateBuilder(args);

// Leer cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new Exception("❌ No se encontró la cadena de conexión en appsettings.json");

// Probar conexión a BD
try
{
    using var testConnection = new MySqlConnection(connectionString);
    testConnection.Open();
    Console.WriteLine("✅ Conexión a la base de datos exitosa");
}
catch (Exception ex)
{
    Console.WriteLine("❌ Error al conectar a la base de datos: " + ex.Message);
    throw;
}

// Configurar DbContext con MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Registrar servicios propios
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UsuarioService>();

// Configurar JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new Exception("❌ No se encontró la clave JWT en appsettings.json (Jwt:Key)");

var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            NameClaimType = ClaimTypes.Email // Para extraer User.Identity.Name del claim "email"
        };
    });

// Controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
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

// Seed inicial
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(context);
}

// Swagger SIEMPRE disponible (no solo en desarrollo)
app.UseSwagger();
app.UseSwaggerUI();

// HTTPS redirection
app.UseHttpsRedirection();

// CORS antes de auth
app.UseCors(corsPolicyName);

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Mapear controladores
app.MapControllers();

// Arrancar app
app.Run();
