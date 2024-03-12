namespace PrintApp.Models
{
    public class Printer : Entity
    {
        public string PrinterName { get; set; }
        public string? Manufacturer { get; set; }
        public int? PrinterTime { get; set; }
        public int? FepCount { get; set; }

        public override string ToString()
        {
            return PrinterName + "(" + Manufacturer + ")";
        }
    }
}
