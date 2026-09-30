using System.ComponentModel.DataAnnotations;

namespace GestaoEmCampo.Models
{
    public class Troca_escala
    {
        [Key]
        public int Id_Troca { get; set; }

        public int Id_Usuario { get; set; }

        public string EscalaAtual { get; set; }

        public string NovaEscala { get; set; }

        public string Status { get; set; }
    }
}
