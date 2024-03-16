using System.ComponentModel.DataAnnotations.Schema;

namespace PrintApp.Models
{
    public class Osoba:Entity
    {

        public string Ime { get; set; }
        public bool isAlive { get; set; }
        public int Age { get; set; }
        [Column("osoba_weight")]
        public decimal weight { get; set; }

    }
}
