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
            object o = validationContext.ObjectType.GetProperty(_comparisonProperty);
            DateTime comparisonValue = (DateTime)o;



            Console.WriteLine(comparisonValue);




            //  DateTime 
            //         comparisonValue = (DateTime)validationContext.ObjectType.GetProperty(_comparisonProperty)
            //                      .GetValue(validationContext.ObjectInstance);



            if (comparisonValue.Equals(DateTime.MinValue) && currentValue != null)
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
