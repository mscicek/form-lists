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
    public class FinanceAccountingController : ControllerBase
    {
        private readonly DataContext _context;

        public FinanceAccountingController(DataContext context)
        {
            _context = context;
        }

        // GET: api/financeaccounting
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinanceAccounting>>> GetFinanceRecords()
        {
            return await _context.FinanceAccounting.ToListAsync();
        }

        // GET: api/financeaccounting/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FinanceAccounting>> GetFinanceRecord(int id)
        {
            var financeRecord = await _context.FinanceAccounting.FindAsync(id);

            if (financeRecord == null)
            {
                return NotFound();
            }

            return financeRecord;
        }

        // POST: api/financeaccounting
        [HttpPost]
        public async Task<ActionResult<FinanceAccounting>> CreateFinanceRecord(FinanceAccounting financeRecord)
        {
            if (financeRecord == null)
            {
                return BadRequest("Finans kaydı boş olamaz.");
            }

            try
            {
                financeRecord.CreatedDate = DateTime.Now;
                _context.FinanceAccounting.Add(financeRecord);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetFinanceRecord), new { id = financeRecord.Id }, financeRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu Hatası: {ex.Message}");
            }
        }

        // PUT: api/financeaccounting/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFinanceRecord(int id, FinanceAccounting financeRecord)
        {
            if (id != financeRecord.Id)
            {
                return BadRequest();
            }

            try
            {
                financeRecord.UpdatedDate = DateTime.Now;
                _context.Entry(financeRecord).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FinanceRecordExists(id))
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

        // DELETE: api/financeaccounting/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFinanceRecord(int id)
        {
            var financeRecord = await _context.FinanceAccounting.FindAsync(id);
            if (financeRecord == null)
            {
                return NotFound();
            }

            _context.FinanceAccounting.Remove(financeRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/financeaccounting/5/approve
        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveFinanceRecord(int id, [FromBody] int approvedBy)
        {
            var financeRecord = await _context.FinanceAccounting.FindAsync(id);
            if (financeRecord == null)
            {
                return NotFound();
            }

            financeRecord.Status = "Approved";
            financeRecord.ApprovedBy = approvedBy;
            financeRecord.ApprovedDate = DateTime.Now;
            financeRecord.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FinanceRecordExists(int id)
        {
            return _context.FinanceAccounting.Any(e => e.Id == id);
        }
    }
} 