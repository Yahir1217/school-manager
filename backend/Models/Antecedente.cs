///LISTO

namespace backend.Models
{
    public class Antecedente
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public Usuario? Alumno { get; set; }

        public int InstitutoOrigenId { get; set; }
        public Instituto? InstitutoOrigen { get; set; }

        public string Nivel { get; set; } = string.Empty; // primaria, secundaria, preparatoria
        public string Observaciones { get; set; } = string.Empty;
        public string Logros { get; set; } = string.Empty;
        public string Reportes { get; set; } = string.Empty;
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
    }
}

