using Microsoft.EntityFrameworkCore;
using PrintApp.Models;

namespace PrintApp.Data
{
    public class PrintAppContext : DbContext
    {
        public PrintAppContext(DbContextOptions<PrintAppContext> options) 
            : base(options) 
        {

        }

        public DbSet<Project> Projects { get; set; }
    }
}
