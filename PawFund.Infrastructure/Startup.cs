using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PawFund.API.Data;
using PawFund.API.Repositories;
using PawFund.API.Services;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Interfaces.Services; // Add this line

namespace PawFund
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext <ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.AddRazorPages();
            services.AddHttpClient();
            services.AddScoped<IPetService, PetService>();
            services.AddScoped<IPetRepository, PetRepository>();// Add this line
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IEventRepository, EventRepository>();// Add this line
            services.AddScoped<IShelterService, ShelterService>();
            services.AddScoped<IShelterRepository, ShelterRepository>();// Add this line
            services.AddScoped<IDonationService, DonationService>();
            services.AddScoped<IDonationRepository, DonationRepository>();// Add this line
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();// Add this line
        }



        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
        }
    }
}
