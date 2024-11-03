using Microsoft.EntityFrameworkCore;
using PawFund.Data.Models;


namespace PawFund.Data.Context
{
    public class PawFundContext : DbContext
    {
        public PawFundContext(DbContextOptions<PawFundContext> options) : base(options) { }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<UserPet> UserPets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Shelter> Shelters { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.HasPostgresEnum<AdoptionStatus>();
            modelBuilder.HasPostgresEnum<UserRole>();
            modelBuilder.HasPostgresEnum<DonationStatus>();
            modelBuilder.HasPostgresEnum<PaymentMethod>();


            modelBuilder.Entity<Pet>()
                .Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<AdoptionStatus>(v));
                

            modelBuilder.Entity<Pet>()
                .HasOne<Shelter>()
                .WithMany()
                .HasForeignKey(p => p.ShelterId);
            
            modelBuilder.Entity<UserPet>()
                .HasOne(up => up.User)
                .WithMany()
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserPet>()
                .HasOne(up => up.Pet)
                .WithMany()
                .HasForeignKey(up => up.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<UserPet>()
                .Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<AdoptionStatus>(v));
                

            modelBuilder.Entity<Donation>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(d => d.UserId);
            
            modelBuilder.Entity<Donation>()
                .Property(e=>e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<DonationStatus>(v));
            modelBuilder.Entity<Donation>()
                .Property(e=>e.PaymentMethod)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<PaymentMethod>(v));

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