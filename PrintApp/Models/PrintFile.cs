using System.ComponentModel.DataAnnotations.Schema;

namespace PrintApp.Models
{
    public class PrintFile : Entity
    {
        public string? FileComment { get; set; }
        public string? FilePath { get; set; }
        public string? FileType { get; set; }
        public int FileVersion { get; set; }
        [ForeignKey("part")]
        public Part Part { get; set; }
    }
}