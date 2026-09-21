using System.ComponentModel.DataAnnotations;

namespace GestaoEmCampo.Models
{
    public class Usuario_Escala
    {
        [Key]
        public int Id_Usuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Tipo_Usuario { get; set; }
    }
}
