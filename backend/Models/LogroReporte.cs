///LISTO

namespace backend.Models
{
    public class LogroReporte
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public Usuario? Alumno { get; set; }

        public int InstitutoId { get; set; }
        public Instituto? Instituto { get; set; }

        public string Tipo { get; set; } = string.Empty; // logro, reporte
        public string Descripcion { get; set; } = string.Empty;
        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}

