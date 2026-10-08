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


        // ==========================================
        // GET
        // LISTAR TODAS AS TROCAS
        // ==========================================

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var trocas = await _context.Trocas_Escala
                .AsNoTracking()
                .ToListAsync();

            return Ok(trocas);
        }


        // ==========================================
        // GET
        // BUSCAR TROCA POR ID
        // ==========================================

        [HttpGet("{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var troca = await _context.Trocas_Escala
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    t => t.Id_Troca == id
                );

            if (troca == null)
            {
                return NotFound(new
                {
                    mensagem =
                        "Solicitação de troca não encontrada."
                });
            }

            return Ok(troca);
        }


        // ==========================================
        // POST
        // CRIAR SOLICITAÇÃO
        // ==========================================

        [HttpPost]
        public async Task<IActionResult> Criar(
            [FromBody] Troca_escala troca)
        {
            // ==========================================
            // VALIDAR OBJETO
            // ==========================================

            if (troca == null)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe os dados da troca."
                });
            }


            // ==========================================
            // VALIDAR USUÁRIO
            // ==========================================

            if (troca.Id_Usuario <= 0)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Usuário inválido."
                });
            }


            // ==========================================
            // VALIDAR ESCALA ATUAL
            // ==========================================

            if (string.IsNullOrWhiteSpace(
                troca.EscalaAtual))
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe a escala atual."
                });
            }


            // ==========================================
            // VALIDAR NOVA ESCALA
            // ==========================================

            if (string.IsNullOrWhiteSpace(
                troca.NovaEscala))
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe a nova escala."
                });
            }


            // ==========================================
            // VERIFICAR ESCALAS IGUAIS
            // ==========================================

            if (troca.EscalaAtual ==
                troca.NovaEscala)
            {
                return BadRequest(new
                {
                    mensagem =
                        "A nova escala deve ser diferente da escala atual."
                });
            }


            // ==========================================
            // VALIDAR DATA
            // ==========================================

            if (troca.DataTroca == default)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe a data desejada para a troca."
                });
            }


            // ==========================================
            // VALIDAR MOTIVO
            // ==========================================

            if (string.IsNullOrWhiteSpace(
                troca.Motivo))
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe o motivo da troca."
                });
            }


            // ==========================================
            // STATUS AUTOMÁTICO
            // ==========================================

            troca.Status = "Pendente";


            // ==========================================
            // SALVAR
            // ==========================================

            _context.Trocas_Escala.Add(troca);

            await _context.SaveChangesAsync();


            // ==========================================
            // RETORNAR RESULTADO
            // ==========================================

            return Ok(new
            {
                mensagem =
                    "Solicitação de troca criada com sucesso.",

                troca = troca
            });
        }


        // ==========================================
        // PUT
        // EDITAR SOLICITAÇÃO
        // ==========================================

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(
            int id,
            [FromBody] Troca_escala dados)
        {
            if (dados == null)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Informe os dados da solicitação."
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
                    mensagem =
                        "Solicitação não encontrada."
                });
            }


            troca.Id_Usuario =
                dados.Id_Usuario;

            troca.EscalaAtual =
                dados.EscalaAtual;

            troca.NovaEscala =
                dados.NovaEscala;

            troca.DataTroca =
                dados.DataTroca;

            troca.Motivo =
                dados.Motivo;

            troca.Status =
                dados.Status;


            await _context.SaveChangesAsync();


            return Ok(new
            {
                mensagem =
                    "Solicitação alterada com sucesso.",

                troca = troca
            });
        }


        // ==========================================
        // DELETE
        // EXCLUIR SOLICITAÇÃO
        // ==========================================

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(
            int id)
        {
            var troca = await _context.Trocas_Escala
                .FirstOrDefaultAsync(
                    t => t.Id_Troca == id
                );


            if (troca == null)
            {
                return NotFound(new
                {
                    mensagem =
                        "Solicitação não encontrada."
                });
            }


            _context.Trocas_Escala.Remove(troca);

            await _context.SaveChangesAsync();


            return Ok(new
            {
                mensagem =
                    "Solicitação excluída com sucesso."
            });
        }
    }
}