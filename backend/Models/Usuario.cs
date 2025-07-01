///LISTO

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        public string NombreCompleto { get; set; } = string.Empty;
        
        [Required]
        public string Correo { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? Telefono { get; set; }

        [Required]
        public string Rol { get; set; } = string.Empty; // alumno, psicologia, etc.

        public bool Estado { get; set; } = true;

        public string? Matricula { get; set; }

        public DateTime? VerificarCorreo { get; set; }

        public string? CodigoVerificacion { get; set; }

        // FK
        public int? InstitutoId { get; set; }

        [ForeignKey("InstitutoId")]
        public Instituto? Instituto { get; set; }
    }
}
