using Microsoft.EntityFrameworkCore;
using FormLists.API.Models;

namespace FormLists.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PersonnelManagement> PersonnelManagement { get; set; }
        public DbSet<FinanceAccounting> FinanceAccounting { get; set; }
    }
}