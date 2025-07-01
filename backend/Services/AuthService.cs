using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity; // <-- necesario para PasswordHasher
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly string _jwtKey;
        private readonly PasswordHasher<Usuario> _passwordHasher;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _jwtKey = config["Jwt:Key"] ?? throw new ArgumentNullException(nameof(config), "Jwt:Key no puede ser null");
            _passwordHasher = new PasswordHasher<Usuario>();
        }

        public string? Login(string email, string password)
        {
            Console.WriteLine($"🔑 Login intento: {email}");

            var user = _context.Usuarios.FirstOrDefault(u => u.Correo == email);
            Console.WriteLine(user != null ? "✅ Usuario encontrado" : "❌ Usuario NO encontrado");

            if (user == null)
                return null;

            Console.WriteLine($"🔒 Password recibido: {password}");
            Console.WriteLine($"🔒 Password en BD (hash): {user.Password}");

            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, password);

            bool validPassword = verificationResult == PasswordVerificationResult.Success 
                                 || verificationResult == PasswordVerificationResult.SuccessRehashNeeded;

            Console.WriteLine(validPassword ? "✅ Password correcto" : "❌ Password incorrecto");

            if (!validPassword)
                return null;

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Correo),
                new Claim("Role", user.Rol ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            Console.WriteLine("🎉 Token generado correctamente");
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Método para hashear la contraseña usando PasswordHasher (para crear usuarios)
        public string HashPassword(Usuario user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }
    }
}
