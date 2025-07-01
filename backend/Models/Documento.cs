///LISTO

namespace backend.Models
{
    public class Documento
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public Usuario? Alumno { get; set; }

        public string Nombre { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty; // constancia, boleta, otros
        public DateTime FechaSubida { get; set; } = DateTime.Now;
    }
}

