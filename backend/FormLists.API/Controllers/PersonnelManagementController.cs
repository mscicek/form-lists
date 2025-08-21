using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormLists.API.Data;
using FormLists.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormLists.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelManagementController : ControllerBase
    {
        private readonly DataContext _context;

        public PersonnelManagementController(DataContext context)
        {
            _context = context;
        }

        // GET: api/personnelmanagement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonnelManagement>>> GetPersonnel()
        {
            return await _context.PersonnelManagement.ToListAsync();
        }

        // GET: api/personnelmanagement/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonnelManagement>> GetPersonnel(int id)
        {
            var personnel = await _context.PersonnelManagement.FindAsync(id);

            if (personnel == null)
            {
                return NotFound();
            }

            return personnel;
        }

        // POST: api/personnelmanagement
        [HttpPost]
        public async Task<ActionResult<PersonnelManagement>> CreatePersonnel(PersonnelManagement personnel)
        {
            if (personnel == null)
            {
                return BadRequest("Personel verisi boş olamaz.");
            }

            try
            {
                personnel.CreatedDate = DateTime.Now;
                _context.PersonnelManagement.Add(personnel);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPersonnel), new { id = personnel.Id }, personnel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu Hatası: {ex.Message}");
            }
        }

        // PUT: api/personnelmanagement/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePersonnel(int id, PersonnelManagement personnel)
        {
            if (id != personnel.Id)
            {
                return BadRequest();
            }

            try
            {
                personnel.UpdatedDate = DateTime.Now;
                _context.Entry(personnel).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/personnelmanagement/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonnel(int id)
        {
            var personnel = await _context.PersonnelManagement.FindAsync(id);
            if (personnel == null)
            {
                return NotFound();
            }

            _context.PersonnelManagement.Remove(personnel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonnelExists(int id)
        {
            return _context.PersonnelManagement.Any(e => e.Id == id);
        }
    }
} 