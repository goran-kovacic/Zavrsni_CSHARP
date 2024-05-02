using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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



    public class ProjectDTOInsertUpdate : IValidatableObject
    {
        [Required(ErrorMessage = "{0} required")]
        public string ProjectName { get; set; }

        [MaxLength(200, ErrorMessage = "{0} cannot exceed {1} characters")]
        public string? ProjectDescription { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CreationDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CompletionDate { get; set; }
        public bool? IsCompleted { get; set; }
        public int? TotalPrintTime { get; set; }
        public int? TotalPrintCount { get; set; }
        public decimal? TotalCost { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {

            if ( CreationDate==null && CompletionDate!=null)
            {
                yield return new ValidationResult("cannot enter completion date without creation date");
            }else if(CreationDate==null || CompletionDate==null){
                yield return ValidationResult.Success;
            }
            else  if(CompletionDate.Value < CreationDate.Value)
            {
                yield return new ValidationResult("end date must be greater than start date");
            }

            
        }
    }




    //public record ProjectDTOInsertUpdate(
    //    [Required(ErrorMessage ="{0} required")]
    //    string? ProjectName,

    //    [MaxLength(200, ErrorMessage = "{0} cannot exceed {1} characters")]
    //    string? ProjectDescription,
    //    //[Required(ErrorMessage = "Creation date is required")]
    //    DateTime? CreationDate,
    //    [DateGreaterThan("CreationDate")]
    //    DateTime? CompletionDate
    //    );

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
        int? PrintCount,
        string? Project_Name,
        int FilesNumber,
        int JobsNumber
        );

    public record PartDTOInsertUpdate(
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string PartName,
        int? IdProject,
        int? PrintCount,
        int? PrintTime,
        decimal? Cost
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
        [Required(ErrorMessage ="{0} required")]
        string? FilePath,
        [MaxLength(200, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? FileComment,
        string? FileType,
        int? FileVersion,
        [Required(ErrorMessage ="{0} required")]
        int? PartId
        );

    public record PrinterDTORead(
        int Id,
        string? PrinterName,
        string? Manufacturer,
        int? PrinterTime,
        int? FepCount,
        int? JobsNumber
        );

    public record PrinterDTOInsertUpdate(
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? PrinterName,
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string? Manufacturer,  
        int? PrinterTime,
        int? FepCount
        );

    public record MaterialDTORead(
        int Id,
        string Manufacturer,
        string MaterialName,
        int LiftDistance,
        int BottomLiftDistance,
        decimal BottomExposure,
        decimal BottomLiftSpeed,
        decimal BottomRetractSpeed,
        decimal CalibratedExposure,
        decimal CostPerUnit,
        decimal LayerHeight,
        decimal LiftSpeed,
        decimal? LightOffDelay,
        decimal RetractSpeed
        //int? PrintJobs
        );

    public record MaterialDTOInsertUpdate(
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string Manufacturer,
        [Required(ErrorMessage ="{0} required")]
        [MaxLength(20, ErrorMessage = "{0} cannot exceed {1} characters")]
        string MaterialName,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 50, ErrorMessage = "{0} mora biti između {1} i {2}")]
        int LiftDistance,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 50, ErrorMessage = "{0} mora biti između {1} i {2}")]
        int BottomLiftDistance,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 100, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal BottomExposure,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 20, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal BottomLiftSpeed,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 20, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal BottomRetractSpeed,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 50, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal CalibratedExposure,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 1000, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal CostPerUnit,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 200, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal LayerHeight,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 20, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal LiftSpeed,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 100, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal? LightOffDelay,
        [Required(ErrorMessage ="{0} required")]
        [Range(0, 20, ErrorMessage = "{0} mora biti između {1} i {2}")]
        decimal RetractSpeed

        );
    
    public record JobDTORead(
        int Id,
        decimal? Cost,
        int? PrintTime,
        //bool? Result,
        decimal? Volume,
        string? Material_Name,
        string? Part_Name,
        string? Printer_Name
        );

    public record JobDTOInsertUpdate(
        [Required(ErrorMessage = "{0} obavezno")]
        int? PrintTime,
        //bool? Result,
        [Range(1, 1000, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "{0} obavezno")]
        decimal? Volume,
        [Required(ErrorMessage = "{0} obavezno")]
        int? MaterialId,
        [Required(ErrorMessage = "{0} obavezno")]
        int? PartId,
        [Required(ErrorMessage = "{0} obavezno")]
        int? PrinterId
        );
}
