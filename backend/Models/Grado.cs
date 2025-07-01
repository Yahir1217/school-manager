///LISTO

using System.Collections.Generic;

namespace backend.Models
{
    public class Grado
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Nivel { get; set; } = string.Empty; // primaria, secundaria, preparatoria
        public string TipoPeriodo { get; set; } = string.Empty; // semestre, cuatrimestre
        public int Orden { get; set; }

        public ICollection<Grupo> Grupos { get; set; } = new List<Grupo>();
        public ICollection<Materia> Materias { get; set; } = new List<Materia>();
    }
}

