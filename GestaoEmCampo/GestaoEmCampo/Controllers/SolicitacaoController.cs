using Microsoft.AspNetCore.Mvc;
using GestaoEmCampo.Data;
using GestaoEmCampo.Models;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SolicitacaoController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public SolicitacaoController(GestaoEmCampoContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Cadastrar([FromBody] Solicitacao solicitacao)
        {
            if (solicitacao == null)
            {
                return BadRequest("Dados da solicitação inválidos.");
            }

            solicitacao.Statuss = false;

            _context.Solicitacoes.Add(solicitacao);

            _context.SaveChanges();

            return Ok(new
            {
                mensagem = "Solicitação realizada com sucesso!",
                solicitacao = solicitacao
            });
        }
    }
}