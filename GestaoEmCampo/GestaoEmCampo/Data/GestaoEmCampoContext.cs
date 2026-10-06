using GestaoEmCampo.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Data
{
    public class GestaoEmCampoContext : DbContext
    {
        public GestaoEmCampoContext(
            DbContextOptions<GestaoEmCampoContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Escala> Escalas { get; set; }

        public DbSet<Solicitacao> Solicitacoes { get; set; }

        public DbSet<Troca_escala> Trocas_Escala { get; set; }
    }
}