using System.ComponentModel.DataAnnotations.Schema;

namespace PrintApp.Models
{
    public class Part:Entity
    {
        public string PartName { get; set; }
        public decimal? Cost { get; set; }
        public int? PrintTime { get; set; }
        [ForeignKey("project_id")]
        public Project? Project { get; set; }
        public List<PrintFile>? FilesInPart { get; set; }
        public List<PrintJob>? JobsInPart { get; set; }
        public override string ToString()

        {
            return PartName + ", Project: " + (Project?.ProjectName ?? "not assigned to a project");
        }

    }
}
