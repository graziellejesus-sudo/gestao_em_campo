
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEmCampo.Models
{
    [Table("Solicitacoes")]
    public class Solicitacao
    {
        [Key]
        [Column("id_solicitacao")]
        public int Id_Solicitacao { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; }

        [Column("data_solicitada_inicio")]
        public DateTime Data_Solicitada_Inicio { get; set; }

        [Column("data_solicitada_fim")]
        public DateTime Data_Solicitada_Fim { get; set; }

        [Column("motivo")]
        public string Motivo { get; set; }

        [Column("statuss")]
        public bool Statuss { get; set; }

        [Column("fk_id_usuario")]
        public int Fk_Id_Usuario { get; set; }

        [Column("fk_id_escala")]
        public int Fk_Id_Escala { get; set; }
    }
}
