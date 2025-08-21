using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormLists.API.Models
{
    [Table("Permissions")]
    public class Permission
    {
        [Key]
        [Column("PermissionId")]
        public int PermissionId { get; set; }

        [Column("UserId")]
        public int UserId { get; set; }

        [Column("FormKey")]
        public string FormKey { get; set; }

        [Column("FormDisplayName")]
        public string FormDisplayName { get; set; }
        
    }
}