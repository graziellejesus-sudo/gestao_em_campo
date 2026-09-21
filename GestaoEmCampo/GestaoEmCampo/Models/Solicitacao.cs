using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEmCampo.Models
{
    public class Solicitacao
    {
        [Key]
        public int Id_Solicitacao { get; set; }
        public string Tipo { get; set; }
        public DateOnly Data_Solicitada_Inicio { get; set; }
        public DateOnly Data_Solicitada_Fim { get; set; }
        public string Motivo { get; set; }
        public bool Statuss { get; set; }
        public int Fk_Id_Usuario { get; set; }
        public int Fk_Id_Escala { get; set; }


    }
}