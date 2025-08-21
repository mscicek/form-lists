using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormLists.API.Models
{
    // ----------- DEĞİŞİKLİK BURADA -----------
    [Table("users")] // "Users" -> "users"
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("LegacyUserId")]
        public int? LegacyUserId { get; set; }

        [Column("Username")]
        public string Username { get; set; }

        [Column("PasswordHash")]
        public string PasswordHash { get; set; }

        [Column("FullName")]
        public string? FullName { get; set; }

        [Column("Role")]
        public string? Role { get; set; }

        [Column("PhoneNumber")]
        public string? PhoneNumber { get; set; }

        [Column("Email")]
        public string? Email { get; set; }

        [Column("IsActive", TypeName = "boolean")]
        public bool IsActive { get; set; }

        [Column("IsTwoFactorEnabled", TypeName = "boolean")]
        public bool IsTwoFactorEnabled { get; set; }
    }
}