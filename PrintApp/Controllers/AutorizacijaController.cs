using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PrintApp.Data;
using PrintApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace PrintApp.Controllers
{
    /// <summary>
    /// Autentifikacija korisnika za pristup svim ostalim rutama
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AutorizacijaController : ControllerBase
    {
        private readonly PrintAppContext _context;

        public AutorizacijaController(PrintAppContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Generiranje tokena
        /// </summary>
        /// <param name="operater"></param>
        /// <returns></returns>
        [HttpPost("token")]
        public IActionResult GenerirajToken(UserDTO operater)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var operBaza = _context.Users
                   .Where(p => p.UserName!.Equals(operater.email))
                   .FirstOrDefault();

            if (operBaza == null)
            {
                // Šaljem Status403Forbidden jer frontend hvata sve 401 i baca na login pa nikada ne dobijem poruku da
                // nije dobro korisničko ime ili lozinka
                return StatusCode(StatusCodes.Status403Forbidden, "Invalid user/password.");
            }



            if (!BCrypt.Net.BCrypt.Verify(operater.password, operBaza.UserPassword))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Invalid user/password.");
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("moj tajni kljuc koji je najbolji kljuc na svijetu i najljepsi");


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);


            return Ok(jwt);

        }

    }
}
