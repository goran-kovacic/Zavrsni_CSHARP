using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace PrintApp.Models
{
    public class DateGreaterThanAttribute: ValidationAttribute
    {
        private readonly string _comparisonProperty;
                
        public DateGreaterThanAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var currentValue = (DateTime)value;

            var comparisonValue = (DateTime)validationContext.ObjectType.GetProperty(_comparisonProperty)
                .GetValue(validationContext.ObjectInstance);

            if(comparisonValue == null && currentValue != null)
            {
                return new ValidationResult(ErrorMessage = "Cannot input completion date while creation date null");
            }
            
            if (currentValue < comparisonValue)
            {
                return new ValidationResult(ErrorMessage = "Completion date must be later than creation date");
            }

            return ValidationResult.Success;
        }
    }
}
