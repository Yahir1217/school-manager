using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity; // <-- Para PasswordHasher

namespace backend.Services
{
    public class UsuarioService
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<Usuario> _passwordHasher;

        public UsuarioService(AppDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<Usuario>();
        }

        public async Task<Usuario> SaveUsuarioAsync(Usuario usuario)
        {
            // Validar correo duplicado (excepto si es edición del mismo usuario)
            var existingEmailUser = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == usuario.Correo && u.Id != usuario.Id);

            if (existingEmailUser != null)
                throw new Exception("Ya existe un usuario con ese correo");

            if (usuario.Id == 0)
            {
                // Nuevo usuario → encriptar contraseña
                usuario.Password = _passwordHasher.HashPassword(usuario, usuario.Password);
                _context.Usuarios.Add(usuario);
            }
            else
            {
                // Editar usuario
                var existingUser = await _context.Usuarios.FindAsync(usuario.Id);
                if (existingUser == null) throw new Exception("Usuario no encontrado");

                existingUser.NombreCompleto = usuario.NombreCompleto;
                existingUser.Correo = usuario.Correo;
                existingUser.Telefono = usuario.Telefono;
                existingUser.Rol = usuario.Rol;
                existingUser.Estado = usuario.Estado;
                existingUser.Matricula = usuario.Matricula;
                existingUser.VerificarCorreo = usuario.VerificarCorreo;
                existingUser.CodigoVerificacion = usuario.CodigoVerificacion;
                existingUser.InstitutoId = usuario.InstitutoId;

                // Si la contraseña cambió, encripta
                if (!string.IsNullOrEmpty(usuario.Password))
                {
                    existingUser.Password = _passwordHasher.HashPassword(existingUser, usuario.Password);
                }
            }

            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> ObtenerUsuarioPorCorreoAsync(string correo)
        {
            return await _context.Usuarios
                .Include(u => u.Instituto)          // Instituto relacionado
                .Include(u => u.Notificaciones)     // Notificaciones relacionadas
                .FirstOrDefaultAsync(u => u.Correo == correo);
        }
    }
}
