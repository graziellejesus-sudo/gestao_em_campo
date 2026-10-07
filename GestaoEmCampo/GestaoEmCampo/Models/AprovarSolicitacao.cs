using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEmCampo.Models
{
        [Table("AprovarSolicitacao")]
        public class AprovarSolicitacao
        {
            [Key]
            [Column("Id_Aprovacao")]
            public int IdAprovacao { get; set; }

            [Column("Fk_Id_Solicitacao")]
            public int FkIdSolicitacao { get; set; }

            [Column("Fk_Id_Gestor")]
            public int FkIdGestor { get; set; }

            [Required]
            [Column("Statuss")]
            [MaxLength(20)]
            public string Statuss { get; set; } = string.Empty;

            [Column("Data_Aprovacao")]
            public DateTime DataAprovacao { get; set; }

            [Column("Observacao")]
            [MaxLength(200)]
            public string? Observacao { get; set; }

            // Relacionamento com Solicitação
            [ForeignKey("FkIdSolicitacao")]
            public virtual Solicitacao? Solicitacao { get; set; }

            // Relacionamento com Usuário/Gestor
            [ForeignKey("FkIdGestor")]
            public virtual Usuario? Gestor { get; set; }
        }
   
}
