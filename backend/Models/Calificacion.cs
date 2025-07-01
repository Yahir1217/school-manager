///LISTO

namespace backend.Models
{
    public class Calificacion
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public Usuario? Alumno { get; set; }

        public int MateriaId { get; set; }
        public Materia? Materia { get; set; }

        public int GrupoId { get; set; }
        public Grupo? Grupo { get; set; }

        public string Periodo { get; set; } = string.Empty;
        public decimal? Valor { get; set; } // calificación
        public bool Reprobado { get; set; } = false;
        public decimal? Nivelacion { get; set; }
        public bool AproboPeriodo { get; set; } = false;
    }
}

