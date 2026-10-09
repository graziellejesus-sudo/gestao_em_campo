using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEmCampo.Models
{
    [Table("Troca_escala")]
    public class TrocaEscala
    {
        // ==========================================
        // ID DA TROCA
        // ==========================================

        [Key]
        public int Id_Troca { get; set; }


        // ==========================================
        // ID DO USUÁRIO
        // ==========================================

        [Required]
        public int Id_Usuario { get; set; }


        // ==========================================
        // ESCALA ATUAL
        // ==========================================

        [Required]
        public string EscalaAtual { get; set; } = string.Empty;


        // ==========================================
        // NOVA ESCALA
        // ==========================================

        [Required]
        public string NovaEscala { get; set; } = string.Empty;


        // ==========================================
        // DATA DA TROCA
        // ==========================================

        [Required]
        public DateTime DataTroca { get; set; }


        // ==========================================
        // MOTIVO
        // ==========================================

        [Required]
        public string Motivo { get; set; } = string.Empty;


        // ==========================================
        // STATUS
        // ==========================================

        [Required]
        public string Statuss{ get; set; } = "Pendente";
    }
}