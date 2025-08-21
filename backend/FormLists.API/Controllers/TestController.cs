using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormLists.API.Data;
using FormLists.API.Models;
using FormLists.API.Helpers;

namespace FormLists.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly DataContext _context;

        public TestController(DataContext context)
        {
            _context = context;
        }

        // GET: api/test/users
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new {
                    u.Id,
                    u.Username,
                    u.IsActive,
                    u.FullName,
                    PasswordHashLength = (u.PasswordHash != null ? u.PasswordHash.Length : 0)
                })
                .ToListAsync();

            return Ok(users);
        }

        // POST: api/test/verify
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPassword([FromBody] VerifyPasswordDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == dto.Username.ToUpper());

            if (user == null)
            {
                return BadRequest($"Kullanıcı bulunamadı: {dto.Username}");
            }

            bool isValid = PasswordHelper.VerifyPassword(dto.Password.ToUpper(), user.PasswordHash);

            return Ok(new
            {
                Username = user.Username,
                IsActive = user.IsActive,
                PasswordValid = isValid,
                HashLength = user.PasswordHash?.Length ?? 0
            });
        }

        // POST: api/test/hash
        [HttpPost("hash")]
        public IActionResult HashPassword([FromBody] HashPasswordDto dto)
        {
            string hash = PasswordHelper.HashPassword(dto.Password.ToUpper());
            bool verify = PasswordHelper.VerifyPassword(dto.Password.ToUpper(), hash);

            return Ok(new
            {
                Password = dto.Password,
                Hash = hash,
                VerifyResult = verify
            });
        }
    }

    public class VerifyPasswordDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class HashPasswordDto
    {
        public string Password { get; set; }
    }
} 