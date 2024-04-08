namespace PrintApp.Models
{
    public record ProjectDTORead(
        int Id,
        string ProjectName,
        DateTime? CreationDate,
        DateTime? CompletionDate,
        bool? IsCompleted,
        int? TotalPrintTime, 
        int? TotalPrintCount,
        decimal? TotalCost,
        string? ProjectDescription
        );
}
