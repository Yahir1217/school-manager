///LISTO

namespace backend.Models
{
    public class Materia
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Clave { get; set; }
        public int? Creditos { get; set; }
        public string Tipo { get; set; } = string.Empty; // obligatoria, optativa

        // FK
        public int GradoId { get; set; }
        public Grado? Grado { get; set; }
    }
}

