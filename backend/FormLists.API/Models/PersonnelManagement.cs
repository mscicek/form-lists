using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormLists.API.Models
{
    [Table("PersonnelManagement")]
    public class PersonnelManagement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("EmployeeId")]
        public string EmployeeId { get; set; }

        [Required]
        [Column("FullName")]
        public string FullName { get; set; }

        [Required]
        [Column("Department")]
        public string Department { get; set; }

        [Required]
        [Column("Position")]
        public string Position { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [Column("HireDate")]
        public DateTime HireDate { get; set; }

        [Column("Salary")]
        public decimal? Salary { get; set; }

        [Column("Status")]
        public string Status { get; set; } = "Active"; // Active, Inactive, Terminated

        [Column("CreatedBy")]
        public int CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column("UpdatedBy")]
        public int? UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate { get; set; }
    }
} 