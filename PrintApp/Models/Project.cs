using System.ComponentModel.DataAnnotations.Schema;

namespace PrintApp.Models
{
    public class Project : Entity
    {
        public string ProjectName { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? CompletionDate { get; set; }        
        public bool? IsCompleted { get; set; }
        public int? TotalPrintTime { get; set; }
        public int? TotalPrintCount { get; set; }
        public decimal? TotalCost { get; set; }
        public string? ProjectDescription { get; set; }
        //public List<Part> PartsInProject { get; set; }

        public override string ToString()
        {
            return ProjectName + " - Started: " + CreationDate +
                ", Completion date: "
                + (CompletionDate == null ? "Work in progress" : CompletionDate.ToString());
        }
    }
}
