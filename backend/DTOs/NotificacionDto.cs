namespace backend.Dtos
{
    public class NotificacionDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Mensaje { get; set; } = string.Empty;
        public bool Leido { get; set; }
        public DateTime FechaEnvio { get; set; }
    }
}
