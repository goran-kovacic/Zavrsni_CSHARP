using System.ComponentModel.DataAnnotations.Schema;

namespace PrintApp.Models
{
    public class PrintJob:Entity
    {
        public decimal? Cost { get; set; }
        public int? PrintTime { get; set; }
        public bool? Result { get; set; }
        public decimal? Volume { get; set; }
        [ForeignKey("material")]
        public Material? Material { get; set; }
        [ForeignKey("part_id")]
        public Part? Part { get; set; }
        [ForeignKey("printer_id")]
        public Printer? Printer { get; set; }


    }
}