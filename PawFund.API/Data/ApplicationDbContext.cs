using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PawFund.Core.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using Npgsql;

namespace PawFund.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Shelter> Shelters { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Pet>()
                .HasOne<Shelter>()
                .WithMany()
                .HasForeignKey(p => p.ShelterId);

            modelBuilder.Entity<Pet>()
                .Property(e => e.Status)
                .HasConversion<string>();
            
            modelBuilder.Entity<Donation>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(d => d.UserId);

            modelBuilder.Entity<Donation>()
            .HasOne<Shelter>()
                .WithMany()
                .HasForeignKey(d => d.ShelterId);

            modelBuilder.Entity<Event>()
                .HasOne<Shelter>()
                .WithMany()
                .HasForeignKey(e => e.ShelterId);
        }
    }
}
