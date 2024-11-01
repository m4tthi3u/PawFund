using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PawFund.Data.Context
{
    public class PawFundContextFactory : IDesignTimeDbContextFactory<PawFundContext>
    {
        public PawFundContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PawFundContext>();
            
            // Replace this connection string with your actual connection string
            optionsBuilder.UseNpgsql("Host=localhost;Database=PawFund;Username=postgres;Password=Lam13492");

            return new PawFundContext(optionsBuilder.Options);
        }
    }
}