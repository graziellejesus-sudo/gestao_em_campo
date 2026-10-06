using System;

namespace GestaoEmCampo.Models
{
    public class Aprovar_Solicitacao
    {
        public int Id_Aprovacao { get; set; }

        public int Fk_Id_Solicitacao { get; set; }

        public int Fk_Id_Gestor { get; set; }

        public string Statuss { get; set; }

        public DateTime Data_Aprovacao { get; set; }

        public string Observacao { get; set; }
    }
}
