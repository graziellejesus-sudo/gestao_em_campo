using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEmCampo.Models
{
    [Table("Escalas")]
    public class Escala
    {
        [Key]
        [Column("id_escala")]
        public int Id_Escala { get; set; }

        [Column("data_inicio")]
        public DateTime Data_Inicio { get; set; }

        [Column("data_fim")]
        public DateTime Data_Fim { get; set; }

        [Column("baixada")]
        public string Baixada { get; set; } = string.Empty;

        [Column("statuss")]
        public bool Statuss { get; set; }
    }
}
