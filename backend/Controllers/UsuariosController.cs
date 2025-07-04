using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> SaveUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var savedUser = await _usuarioService.SaveUsuarioAsync(usuario);
                return Ok(savedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // 🔐 Nuevo: Obtener usuario autenticado
[HttpGet("detalle")]
[Authorize]
public async Task<ActionResult<UsuarioDto>> GetUsuarioActual()
{
    try
    {
        var correo = User.Identity?.Name;

        if (string.IsNullOrEmpty(correo))
            return Unauthorized(new { message = "No se pudo obtener el correo del token" });

        var usuario = await _usuarioService.ObtenerUsuarioPorCorreoAsync(correo);

        if (usuario == null)
            return NotFound(new { message = "Usuario no encontrado" });

        // 🧩 Mapear a DTO
        var usuarioDto = new UsuarioDto
        {
            Id = usuario.Id,
            NombreCompleto = usuario.NombreCompleto,
            Correo = usuario.Correo,
            Telefono = usuario.Telefono,
            Rol = usuario.Rol,
            Estado = usuario.Estado,
            Matricula = usuario.Matricula,
            VerificarCorreo = usuario.VerificarCorreo,
            CodigoVerificacion = usuario.CodigoVerificacion,
            Instituto = usuario.Instituto != null ? new InstitutoDto
            {
                Id = usuario.Instituto.Id,
                Nombre = usuario.Instituto.Nombre,
                Clave = usuario.Instituto.Clave,
                Direccion = usuario.Instituto.Direccion,
                Telefono = usuario.Instituto.Telefono,
                LogoUrl = usuario.Instituto.LogoUrl
            } : null,
            Notificaciones = usuario.Notificaciones?.Select(n => new NotificacionDto
            {
                Id = n.Id,
                Titulo = n.Titulo,
                Mensaje = n.Mensaje,
                Leido = n.Leido,
                FechaEnvio = n.FechaEnvio
            }).ToList()
        };

        return Ok(usuarioDto);
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = ex.Message });
    }
}
    }
}
