namespace PrintApp.Models
{
    public class Material : Entity
    {
        public string? Manufacturer { get; set; }
        public string MaterialName { get; set; }
        public int LiftDistance { get; set; }
        public int BottomLiftDistance { get; set; }
        public decimal BottomExposure { get; set; }
        public decimal BottomLiftSpeed { get; set; }
        public decimal BottomRetractSpeed { get; set; }
        public decimal CalibratedExposure { get; set; }
        public decimal CostPerUnit { get; set; }
        public decimal LayerHeight { get; set; }
        public decimal LiftSpeed { get; set; }
        public decimal? LightOffDelay { get; set; }
        public decimal RetractSpeed { get; set; }

        public override string ToString()
        {
            return MaterialName + " (" + Manufacturer + ")";
        }
    }
}
