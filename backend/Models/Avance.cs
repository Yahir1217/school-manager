///LISTO

namespace backend.Models
{
    public class Avance
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public Usuario? Alumno { get; set; }

        public int GradoActualId { get; set; }
        public Grado? GradoActual { get; set; }

        public int GrupoActualId { get; set; }
        public Grupo? GrupoActual { get; set; }

        public string Status { get; set; } = "en_curso"; // en_curso, graduado
        public DateTime FechaCambio { get; set; } = DateTime.Now;
    }
}
