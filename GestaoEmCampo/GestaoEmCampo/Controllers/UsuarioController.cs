using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public UsuarioController(GestaoEmCampoContext context)
        {
            _context = context;
        }

        // ============================================================
        // LISTAR USUÁRIOS
        // GET: api/Usuario
        // ============================================================

        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            var usuarios = _context.Usuarios
                .Select(u => new
                {
                    id = u.Id_Usuario,
                    nome = u.Nome,
                    email = u.Email,
                    cargo = u.Cargo
                })
                .ToList();

            return Ok(usuarios);
        }

        // ============================================================
        // LOGIN
        // POST: api/Usuario/login
        // ============================================================

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest(new
                {
                    mensagem = "Informe o email e a senha."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Email))
            {
                return BadRequest(new
                {
                    mensagem = "O email é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Senha))
            {
                return BadRequest(new
                {
                    mensagem = "A senha é obrigatória."
                });
            }

            var usuarioBanco = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Email == usuario.Email &&
                    u.Senha == usuario.Senha
                );

            if (usuarioBanco == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Email ou senha incorretos."
                });
            }

            // Salva o ID do usuário na sessão
            HttpContext.Session.SetString(
                "IdLogado",
                usuarioBanco.Id_Usuario.ToString()
            );

            return Ok(new
            {
                mensagem = "Login realizado com sucesso.",
                id = usuarioBanco.Id_Usuario,
                nome = usuarioBanco.Nome,
                email = usuarioBanco.Email,
                cargo = usuarioBanco.Cargo
            });
        }

        // ============================================================
        // LOGOUT
        // GET: api/Usuario/logout
        // ============================================================

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            return Ok(new
            {
                mensagem = "Logout realizado com sucesso."
            });
        }

        // ============================================================
        // CADASTRAR USUÁRIO
        // POST: api/Usuario
        // ============================================================

        [HttpPost]
        public IActionResult CadastrarUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest(new
                {
                    mensagem = "Informe os dados do usuário."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Nome))
            {
                return BadRequest(new
                {
                    mensagem = "O nome é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Email))
            {
                return BadRequest(new
                {
                    mensagem = "O email é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Senha))
            {
                return BadRequest(new
                {
                    mensagem = "A senha é obrigatória."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.Cargo))
            {
                return BadRequest(new
                {
                    mensagem = "O cargo é obrigatório."
                });
            }

            // Verifica se o email já existe
            var emailExiste = _context.Usuarios
                .Any(u => u.Email == usuario.Email);

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem = "Este email já está cadastrado."
                });
            }

            try
            {
                // Adiciona o usuário
                _context.Usuarios.Add(usuario);

                // Salva no banco
                _context.SaveChanges();

                // Retorna sucesso
                return Created(
                    $"api/Usuario/{usuario.Id_Usuario}",
                    new
                    {
                        mensagem = "Usuário cadastrado com sucesso.",
                        id = usuario.Id_Usuario,
                        nome = usuario.Nome,
                        email = usuario.Email,
                        cargo = usuario.Cargo
                    }
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine("=================================");
                Console.WriteLine("ERRO AO CADASTRAR USUÁRIO");
                Console.WriteLine("=================================");

                Console.WriteLine(ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("----------- INNER EXCEPTION -----------");
                    Console.WriteLine(ex.InnerException.Message);
                }

                if (ex.InnerException?.InnerException != null)
                {
                    Console.WriteLine("------ INNER EXCEPTION 2 ------");
                    Console.WriteLine(
                        ex.InnerException.InnerException.Message
                    );
                }

                Console.WriteLine("=================================");

                return StatusCode(500, new
                {
                    mensagem = "Erro ao salvar usuário no banco de dados.",
                    erro = ex.InnerException?.Message ?? ex.Message
                });
            }
        }

        // ============================================================
        // DELETAR USUÁRIO
        // DELETE: api/Usuario/{id}
        // ============================================================

        [HttpDelete("{id}")]
        public IActionResult DeletarUsuario(int id)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Faça login antes."
                });
            }

            if (!int.TryParse(idLogado, out int idUsuarioLogado))
            {
                return Unauthorized(new
                {
                    mensagem = "ID do usuário inválido."
                });
            }

            var usuarioLogado = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Id_Usuario == idUsuarioLogado
                );

            if (usuarioLogado == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Usuário logado não encontrado."
                });
            }

            // Apenas Gestão pode excluir usuários
            if (string.IsNullOrWhiteSpace(usuarioLogado.Cargo) ||
                !usuarioLogado.Cargo.Trim()
                    .Equals("Gestão", StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized(new
                {
                    mensagem = "Apenas gestores podem deletar usuários."
                });
            }

            var usuarioBanco = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Id_Usuario == id
                );

            if (usuarioBanco == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            _context.Usuarios.Remove(usuarioBanco);

            _context.SaveChanges();

            return Ok(new
            {
                mensagem = "Usuário deletado com sucesso."
            });
        }

        // ============================================================
        // PERFIL DO USUÁRIO LOGADO
        // GET: api/Usuario/perfil
        // ============================================================

        [HttpGet("perfil")]
        public IActionResult Perfil()
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Faça login."
                });
            }

            if (!int.TryParse(idLogado, out int idUsuario))
            {
                return Unauthorized(new
                {
                    mensagem = "ID do usuário inválido."
                });
            }

            var usuario = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Id_Usuario == idUsuario
                );

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            return Ok(new
            {
                id = usuario.Id_Usuario,
                nome = usuario.Nome,
                email = usuario.Email,
                cargo = usuario.Cargo
            });
        }
    }
}
