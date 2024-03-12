﻿using Microsoft.EntityFrameworkCore;
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
    }
}
