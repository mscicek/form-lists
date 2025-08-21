using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormLists.API.Models
{
    [Table("FinanceAccounting")]
    public class FinanceAccounting
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("TransactionDate")]
        public DateTime TransactionDate { get; set; }

        [Required]
        [Column("TransactionType")]
        public string TransactionType { get; set; } // Income, Expense, Transfer

        [Required]
        [Column("Category")]
        public string Category { get; set; } // Revenue, Cost, Salary, Rent, etc.

        [Required]
        [Column("Description")]
        public string Description { get; set; }

        [Required]
        [Column("Amount")]
        public decimal Amount { get; set; }

        [Column("Currency")]
        public string Currency { get; set; } = "TRY";

        [Column("AccountNumber")]
        public string AccountNumber { get; set; }

        [Column("InvoiceNumber")]
        public string InvoiceNumber { get; set; }

        [Column("VendorName")]
        public string VendorName { get; set; }

        [Column("PaymentMethod")]
        public string PaymentMethod { get; set; } // Cash, Bank Transfer, Credit Card

        [Column("Status")]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected, Completed

        [Column("Notes")]
        public string Notes { get; set; }

        [Column("CreatedBy")]
        public int CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column("ApprovedBy")]
        public int? ApprovedBy { get; set; }

        [Column("ApprovedDate")]
        public DateTime? ApprovedDate { get; set; }

        [Column("UpdatedBy")]
        public int? UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate { get; set; }
    }
} 