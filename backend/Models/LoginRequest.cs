namespace backend.Models
{
    public class LoginRequest
    {
        public string Correo { get; set; } = string.Empty;  // Cambié Email a Correo para que sea consistente
        public string Password { get; set; } = string.Empty;
    }
}
