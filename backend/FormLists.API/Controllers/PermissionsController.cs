using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormLists.API.Data;
using FormLists.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormLists.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly DataContext _context;

        public PermissionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/permissions/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserPermissions(int userId)
        {
            var permissions = await _context.Permissions
                                            .Where(p => p.UserId == userId)
                                            .ToListAsync();

            if (!permissions.Any())
            {
                return Ok(new List<Permission>()); // Hata vermek yerine boş liste dön
            }

            return Ok(permissions);
        }
    }
}