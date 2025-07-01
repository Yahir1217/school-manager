using backend.Models;
using Microsoft.AspNetCore.Identity;
using System;

namespace backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            Console.WriteLine("Seed: Iniciando inicialización...");

            if (context.Usuarios.Any())
            {
                Console.WriteLine("Seed: Ya existen usuarios, no se hará seed.");
                return;
            }

            Console.WriteLine("Seed: Creando instituto y usuario admin...");

            var instituto = new Instituto
            {
                Nombre = "Instituto Central",
                Clave = "IC001",
                Direccion = "Av. Principal 123",
                Telefono = "5550001111",
                LogoUrl = "https://ejemplo.com/logo.png"
            };
            context.Institutos.Add(instituto);
            context.SaveChanges();

            var admin = new Usuario
            {
                NombreCompleto = "Administrador General",
                Correo = "admin@correo.com",
                Telefono = "5551234567",
                Rol = "director",
                Estado = true,
                Matricula = "ADM001",
                InstitutoId = instituto.Id
            };

            var passwordHasher = new PasswordHasher<Usuario>();
            admin.Password = passwordHasher.HashPassword(admin, "123456");

            context.Usuarios.Add(admin);
            context.SaveChanges();

            Console.WriteLine("Seed: Datos insertados correctamente.");
        }
    }
}
