using System.ComponentModel.DataAnnotations;

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

    public record ProjectDTOInsertUpdate(
        [Required(ErrorMessage ="Name required")]
        string? ProjectName,

        [MaxLength(200, ErrorMessage = "Description cannot exceed {1} characters")]
        string? ProjectDescription,
        //[Required(ErrorMessage = "Creation date is required")]
        DateTime? CreationDate,
        //[Required(ErrorMessage = "Completion date is required")]
        DateTime? CompletionDate
        );

    public record UserDTORead(
        int Id,
        string UserName,
        string UserPassword
        );

    public record UserDTOInsertUpdate(
        [Required(ErrorMessage ="User name required")]
        [MaxLength(20, ErrorMessage = "Username cannot exceed {1} characters")]
        string UserName,
        [Required(ErrorMessage ="Password required")]
        string UserPassword
        );

    
}
