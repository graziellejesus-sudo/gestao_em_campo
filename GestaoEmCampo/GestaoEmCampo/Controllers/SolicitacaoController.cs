using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacaoController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public SolicitacaoController(GestaoEmCampoContext context) { _context = context; }

        // ========================================== // GET // LISTAR SOLICITAÇÕES // ==========================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> Listar()
        {
            var solicitacoes = await _context.Solicitacoes.ToListAsync();

            return Ok(solicitacoes);
        }

        // ========================================== // POST // CADASTRAR SOLICITAÇÃO // ==========================================

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] Solicitacao solicitacao)
        {
            if (solicitacao == null) { return BadRequest(new { mensagem = "Dados da solicitação inválidos." }); }

            // Toda nova solicitação começa como pendente solicitacao.Statuss = false;

            _context.Solicitacoes.Add(solicitacao);

            await _context.SaveChangesAsync();

            return Ok(new { mensagem = "Solicitação realizada com sucesso!", solicitacao = solicitacao });
        }

        // ========================================== // PUT // APROVAR SOLICITAÇÃO // ==========================================

        [HttpPut("{id}/aprovar")]
        public async Task<IActionResult> Aprovar(int id)
        {
            try
            {
                var solicitacao = await _context.Solicitacoes.FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                if (solicitacao == null) { return NotFound(new { mensagem = "Solicitação não encontrada." }); }

                // ====================================== // ALTERAR STATUS PARA APROVADA // ======================================

                solicitacao.Statuss = true;

                // ====================================== // SALVAR NO BANCO // ======================================

                await _context.SaveChangesAsync();

                // ====================================== // BUSCAR NOVAMENTE PARA CONFIRMAR // ======================================

                var solicitacaoAtualizada = await _context.Solicitacoes.FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                return Ok(new
                {
                    mensagem = "Solicitação aprovada com sucesso!",

                    solicitacao = solicitacaoAtualizada
                });
            }
            catch (Exception erro)
            {
                Console.WriteLine("=================================");

                Console.WriteLine("ERRO AO APROVAR SOLICITAÇÃO");

                Console.WriteLine(erro.ToString());

                Console.WriteLine("=================================");

                return StatusCode(500, new
                {
                    mensagem = "Erro ao aprovar solicitação.",

                    erro = erro.Message
                });
            }
        }

        // ========================================== // PUT // RECUSAR SOLICITAÇÃO // ==========================================

        [HttpPut("{id}/recusar")]
        public async Task<IActionResult> Recusar(int id)
        {
            try
            {
                var solicitacao = await _context.Solicitacoes.FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                if (solicitacao == null) { return NotFound(new { mensagem = "Solicitação não encontrada." }); }

                // ====================================== // ALTERAR STATUS PARA RECUSADA // ======================================

                solicitacao.Statuss = false;

                await _context.SaveChangesAsync();

                // ====================================== // BUSCAR NOVAMENTE // ======================================

                var solicitacaoAtualizada = await _context.Solicitacoes.FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                return Ok(new
                {
                    mensagem = "Solicitação recusada com sucesso!",

                    solicitacao = solicitacaoAtualizada
                });
            }
            catch (Exception erro)
            {
                Console.WriteLine("=================================");

                Console.WriteLine("ERRO AO RECUSAR SOLICITAÇÃO");

                Console.WriteLine(erro.ToString());

                Console.WriteLine("=================================");

                return StatusCode(500, new
                {
                    mensagem = "Erro ao recusar solicitação.",

                    erro = erro.Message
                });
            }
        }
    }
}