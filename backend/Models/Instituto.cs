///LISTO

using System.Collections.Generic;

namespace backend.Models
{
    public class Instituto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Clave { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string LogoUrl { get; set; } = string.Empty;

        // Relación
        public ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
    }
}

