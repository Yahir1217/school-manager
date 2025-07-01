///LISTO

namespace backend.Models
{
    public class Notificacion
    {
        public int Id { get; set; }

        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        public string Titulo { get; set; } = string.Empty;
        public string Mensaje { get; set; } = string.Empty;
        public bool Leido { get; set; } = false;
        public DateTime FechaEnvio { get; set; } = DateTime.Now;
    }
}
