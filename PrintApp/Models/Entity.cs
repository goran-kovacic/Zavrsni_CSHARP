using System.ComponentModel.DataAnnotations;

namespace PrintApp.Models
{
    public abstract class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}
