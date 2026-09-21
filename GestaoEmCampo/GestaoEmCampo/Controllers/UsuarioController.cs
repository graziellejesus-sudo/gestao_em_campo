using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public UsuarioController(GestaoEmCampoContext context)
        {
            _context = context;
        }

        // LISTAR USUÁRIOS
        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            var usuarios = _context.Usuarios
                .Select(u => new
                {
                    Id = u.Id_Usuario,
                    Nome = u.Nome
                })
                .ToList();

            return Ok(usuarios);
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(Usuario usuario)
        {
            var usuarioBanco = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Email == usuario.Email &&
                    u.Senha == usuario.Senha);

            if (usuarioBanco == null)
            {
                return Unauthorized("Email ou senha incorretos!");
            }

            HttpContext.Session.SetString(
                "IdLogado",
                usuarioBanco.Id_Usuario.ToString()
            );

            return Ok(usuarioBanco.Cargo.Trim());
        }

        // LOGOUT
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            return Ok("Logout realizado!");
        }

        // CADASTRAR USUÁRIO
        [HttpPost]
        public IActionResult CadastraUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return Created("", usuario);
        }

        // DELETAR USUÁRIO
        [HttpDelete("{id}")]
        public IActionResult DeletaUsuario(int id)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes.");
            }

            if (!int.TryParse(idLogado, out int idUsuarioLogado))
            {
                return Unauthorized("ID do usuário inválido.");
            }

            var usuarioLogado = _context.Usuarios
                .FirstOrDefault(u => u.Id_Usuario == idUsuarioLogado);

            if (usuarioLogado == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            if (string.IsNullOrWhiteSpace(usuarioLogado.Cargo) ||
                !usuarioLogado.Cargo.Trim().Equals("Gestão"))
            {
                return Unauthorized(
                    "Apenas gestores podem deletar usuários."
                );
            }

            var usuarioBanco = _context.Usuarios
                .FirstOrDefault(u => u.Id_Usuario == id);

            if (usuarioBanco == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            _context.Usuarios.Remove(usuarioBanco);
            _context.SaveChanges();

            return Ok("Usuário deletado com sucesso.");
        }

        // PERFIL
        [HttpGet("perfil")]
        public IActionResult Perfil()
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça login.");
            }

            if (!int.TryParse(idLogado, out int idUsuario))
            {
                return Unauthorized("ID do usuário inválido.");
            }

            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Id_Usuario == idUsuario);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(new
            {
                usuario.Id_Usuario,
                usuario.Nome,
                usuario.Email,
                usuario.Cargo
            });
        }
    }
}