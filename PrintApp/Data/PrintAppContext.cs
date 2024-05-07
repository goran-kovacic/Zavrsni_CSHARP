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
        public DbSet<Printer> Printers { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<PrintFile> PrintFiles { get; set; }
        public DbSet<PrintJob> PrintJobs { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Part>().HasOne(p => p.Project);
            //modelBuilder.Entity<PrintFile>().HasOne(p => p.Part);
            modelBuilder.Entity<PrintJob>().HasOne(p => p.Part);
            modelBuilder.Entity<PrintJob>().HasOne(p => p.Printer);
            modelBuilder.Entity<PrintJob>().HasOne(p => p.Material);

        }
    }
}
