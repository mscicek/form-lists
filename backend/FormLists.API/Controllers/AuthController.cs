using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormLists.API.Data;
using FormLists.API.Dtos;
using FormLists.API.Helpers;
using FormLists.API.Models;
using System.Threading.Tasks;

namespace FormLists.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Username) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Username and password cannot be empty.");
            }

            var usernameUpper = loginDto.Username.ToUpper();

            // Sorguyu en temel haliyle bırakıyoruz. C# 'true' değerini kullanıyoruz.
            var user = await _context.Users
                                     .FirstOrDefaultAsync(u => u.Username == usernameUpper && u.IsActive); // '== true' yazmakla aynıdır

            if (user == null)
            {
                return BadRequest("Invalid username or password.");
            }

            bool isPasswordValid = PasswordHelper.VerifyPassword(loginDto.Password.ToUpper(), user.PasswordHash);

            if (!isPasswordValid)
            {
                return BadRequest("Invalid username or password.");
            }

            return Ok(user);
        }
    }
}