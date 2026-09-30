using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Troca_escalaController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public Troca_escalaController(
            GestaoEmCampoContext context)
        {
            _context = context;
        }

        // LISTAR TODAS AS SOLICITAÇÕES

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var trocas = await _context.Trocas_Escala
                .ToListAsync();

            return Ok(trocas);
        }

        // BUSCAR SOLICITAÇÃO POR ID
     

        [HttpGet("{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var troca = await _context.Trocas_Escala
                .FirstOrDefaultAsync(
                    t => t.Id_Troca == id
                );

            if (troca == null)
            {
                return NotFound(new
                {
                    mensagem = "Solicitação de troca não encontrada."
                });
            }

            return Ok(troca);
        }

        // CRIAR SOLICITAÇÃO DE TROCA
        

        [HttpPost]
        public async Task<IActionResult> Criar(
            [FromBody] Troca_escala troca)
        {
            if (troca == null)
            {
                return BadRequest(new
                {
                    mensagem = "Informe os dados da troca."
                });
            }

            if (troca.Id_Usuario <= 0)
            {
                return BadRequest(new
                {
                    mensagem = "Usuário inválido."
                });
            }

            if (string.IsNullOrWhiteSpace(troca.EscalaAtual))
            {
                return BadRequest(new
                {
                    mensagem = "Informe a escala atual."
                });
            }

            if (string.IsNullOrWhiteSpace(troca.NovaEscala))
            {
                return BadRequest(new
                {
                    mensagem = "Informe a nova escala."
                });
            }

            if (troca.EscalaAtual == troca.NovaEscala)
            {
                return BadRequest(new
                {
                    mensagem =
                        "A nova escala deve ser diferente da escala atual."
                });
            }

            // Toda nova solicitação começa como Pendente
            troca.Status = "Pendente";

            _context.Trocas_Escala.Add(troca);

            await _context.SaveChangesAsync();

            return Ok(troca);
        }
        // ALTERAR STATUS DA SOLICITAÇÃO
 

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(
            int id,
            [FromBody] Troca_escala dados)
        {
            if (dados == null)
            {
                return BadRequest(new
                {
                    mensagem = "Informe os dados da solicitação."
                });
            }

            var troca = await _context.Trocas_Escala
                .FirstOrDefaultAsync(
                    t => t.Id_Troca == id
                );

            if (troca == null)
            {
                return NotFound(new
                {
                    mensagem = "Solicitação não encontrada."
                });
            }

            troca.Id_Usuario = dados.Id_Usuario;
            troca.EscalaAtual = dados.EscalaAtual;
            troca.NovaEscala = dados.NovaEscala;
            troca.Status = dados.Status;

            await _context.SaveChangesAsync();

            return Ok(troca);
        }
        // EXCLUIR SOLICITAÇÃO
       

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var troca = await _context.Trocas_Escala
                .FirstOrDefaultAsync(
                    t => t.Id_Troca == id
                );

            if (troca == null)
            {
                return NotFound(new
                {
                    mensagem = "Solicitação não encontrada."
                });
            }

            _context.Trocas_Escala.Remove(troca);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem = "Solicitação excluída com sucesso."
            });
        }
    }
}
