///LISTO

namespace backend.Models
{
    public class Grupo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string CicloEscolar { get; set; } = string.Empty;

        // FK
        public int GradoId { get; set; }
        public Grado? Grado { get; set; }
    }
}

