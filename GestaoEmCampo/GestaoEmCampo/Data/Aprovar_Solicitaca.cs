using System;

namespace GestaoEmCampo.Data
{
    public class Aprovar_Solicitacao
    {
        public int Id { get; set; }

        public string Funcionario { get; set; }

        public string TipoSolicitacao { get; set; }

        public DateTime DataInicial { get; set; }

        public DateTime DataFinal { get; set; }

        public string Motivo { get; set; }

        public string Statuss { get; set; }
    }
}
