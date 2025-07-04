namespace backend.Dtos
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string? Telefono { get; set; }
        public string Rol { get; set; } = string.Empty;
        public bool Estado { get; set; }
        public string? Matricula { get; set; }
        public DateTime? VerificarCorreo { get; set; }
        public string? CodigoVerificacion { get; set; }

        public InstitutoDto? Instituto { get; set; }

        public ICollection<NotificacionDto>? Notificaciones { get; set; }
    }
}
