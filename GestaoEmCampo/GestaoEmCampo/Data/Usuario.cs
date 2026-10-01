using System.ComponentModel.DataAnnotations;

namespace GestaoEmCampo.Models
{
    public class Usuario
    {
        [Key]
        public int Id_Usuario { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Senha { get; set; } = string.Empty;

        public string Cargo { get; set; } = string.Empty;
    }
}
