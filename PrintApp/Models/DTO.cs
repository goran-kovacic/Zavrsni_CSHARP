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
        [Required(ErrorMessage ="{0} required")]
        string? ProjectName,

        [MaxLength(200, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? ProjectDescription,
        //[Required(ErrorMessage = "Creation date is required")]
        DateTime? CreationDate,
        [DateGreaterThan("CreationDate")]
        DateTime? CompletionDate
        );

    public record UserDTORead(
        int Id,
        string UserName,
        string UserPassword
        );

    public record UserDTOInsertUpdate(
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string UserName,
        [Required(ErrorMessage ="{0} required")]
        string UserPassword
        );

    public record PartDTORead(
        int Id,
        string? PartName,
        decimal? Cost,
        int? PrintTime,
        string? Project_Name
        );

    public record PartDTOInsertUpdate(
        [Required(ErrorMessage ="{0} name required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string PartName,
        int? ProjectId
        );

    public record FileDTORead(
        int Id,
        string? FileComment,
        string? FilePath,
        string? FileType,
        int? FileVersion,
        string? Part_Name
        );

    public record FileDTOInsertUpdate(
        [Required(ErrorMessage ="{0} name required")]
        string? FilePath,
        [MaxLength(200, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? FileComment,
        string? FileType,
        int? FileVersion,
        int? PartId
        );

    public record PrinterDTORead(
        int Id,
        string? PrinterName,
        string? Manufacturer,
        int? PrinterTime,
        int? FepCount
        //int? PrintJobs
        );

    public record PrinterDTOInsertUpdate(
        [Required(ErrorMessage ="{0} name required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? PrinterName,
        [Required(ErrorMessage ="{0} name required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? Manufacturer        
        );
    
}
