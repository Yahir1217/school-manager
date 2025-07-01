///LISTO

namespace backend.Models
{
    public class Horario
    {
        public int Id { get; set; }

        public int GrupoId { get; set; }
        public Grupo? Grupo { get; set; }

        public int MateriaId { get; set; }
        public Materia? Materia { get; set; }

        public int DocenteId { get; set; } // FK a usuarios
        public Usuario? Docente { get; set; }

        public string DiaSemana { get; set; } = string.Empty; // lunes, martes, etc.
        public TimeSpan? HoraInicio { get; set; }
        public TimeSpan? HoraFin { get; set; }
    }
}
