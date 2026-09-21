namespace GestaoEmCampo.Models
{
    public class Escala
    {
        public int Id_Escala { get; set; }
        public DateOnly Data_Inicio { get; set; }
        public DateOnly Data_Fim { get; set; }
        public string Baixada { get; set; }
        public bool Statuss { get; set; }


    }
}
