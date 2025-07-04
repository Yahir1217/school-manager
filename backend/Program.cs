using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using System.Text;
using System.Security.Claims; // 👈 AGREGA ESTA LÍNEA


var builder = WebApplication.CreateBuilder(args);

// 🔑 Leer cadena de conexión desde appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new Exception("❌ No se encontró la cadena de conexión en appsettings.json");

// ✅ Probar conexión manualmente
try
{
    using var testConnection = new MySqlConnection(connectionString);
    testConnection.Open();
    Console.WriteLine("✅ Conexión a la base de datos exitosa");
}
catch (Exception ex)
{
    Console.WriteLine("❌ Error al conectar a la base de datos: " + ex.Message);
    throw; // Detener la app si no hay conexión
}

// 💾 Configurar DbContext con MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ➕ Registrar servicios propios
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UsuarioService>();

// 🔑 Configurar JWT Authentication
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

            // 👇 Esto indica que vamos a extraer User.Identity.Name del claim "email"
            NameClaimType = ClaimTypes.Email
        };
    });

// 📦 Controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔐 CORS
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

// ✅ Seed inicial
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(context);
}

// 📦 Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🛡 Redirección HTTPS
app.UseHttpsRedirection();

// 🛡 CORS antes de auth
app.UseCors(corsPolicyName);

// 🔑 Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// 🚀 Mapear controladores
app.MapControllers();

// ✅ Arrancar
app.Run();
