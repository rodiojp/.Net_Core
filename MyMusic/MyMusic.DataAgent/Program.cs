
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MyMusic.Core;
using MyMusic.Core.Models;
using MyMusic.Core.Services;
using MyMusic.Data;
using MyMusic.Services;
using Serilog;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MyMusic.DataAgent
{
    class Program
    {
        // As from MyMusic.Api -> StartUp.cs  -> public IConfiguration Configuration { get; }
        public static IConfigurationRoot Configuration;
        private const string appsettingsFileName = "appsettings.json";
        private const string connectionStringName = "DefaultConnection";
        static int Main(string[] args)
        {
            // Initialize serilog logger
            Log.Logger = new LoggerConfiguration()
                 .WriteTo.Console(Serilog.Events.LogEventLevel.Debug)
                 .MinimumLevel.Debug()
                 .Enrich.FromLogContext()
                 .CreateLogger();

            try
            {
                // Start!
                MainAsync(args).Wait();
                return 0;
            }
            catch
            {
                return 1;
            }
        }

        static async Task MainAsync(string[] args)
        {
            // Create service collection
            Log.Information("----- Creating service collection");
            ServiceCollection serviceCollection = new ServiceCollection();

            // Call static void ConfigureServices(IServiceCollection services)
            ConfigureServices(serviceCollection);

            // Create service provider
            Log.Information("----- Building service provider");
            IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

            // Print connection string to demonstrate configuration object is populated
            Log.Information($"\"{connectionStringName}\" = \"{Configuration.GetConnectionString(connectionStringName)}\"");

            // Run configured services
            try
            {
                Log.Information("----- Starting service(s)");
                Log.Information("***** service: .GetService<EmailApp>().Run()");
                await serviceProvider.GetService<EmailApp>().Run();

                //Log.Information("***** service: .GetService<ArtistsController>().GetArtistById(1)");
                //Artist newArtist = await serviceProvider.GetService<ArtistsController>().CreateArtist(new Artist() { Name = "John Lennon" });

                Log.Information("***** service: .GetService<ArtistsController>().GetAllArtists()");
                await serviceProvider.GetService<ArtistsController>().GetAllArtists();
                Log.Information("***** service: .GetService<ArtistsController>().GetArtistById(1)");
                await serviceProvider.GetService<ArtistsController>().GetArtistById(1);

                Log.Information("***** service: .GetService<MusicsController>().GetAllMusics()");
                await serviceProvider.GetService<MusicsController>().GetAllMusics();
                Log.Information("***** service: .GetService<MusicsController>().GetMusicById(1)");
                await serviceProvider.GetService<MusicsController>().GetMusicById(1);



                Log.Information("----- Ending service(s)");
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Error running service!");
                //throw ex;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// Method similar to MyMusic.Api -> StartUp.cs -> public void ConfigureServices(IServiceCollection services)
        /// </summary>
        /// <param <see cref="ServiceCollection"/> name="services"></param>
        private static void ConfigureServices(IServiceCollection services)
        {
            // Add Serilog logging
            services.AddSingleton(LoggerFactory.Create(builder =>
            {
                builder.AddSerilog(dispose: true);
            }));

            // Microsoft.Extensions.DependencyInjection -> static class LoggingServiceCollectionExtensions
            services.AddLogging();

            // Build configuration
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
                .AddJsonFile(appsettingsFileName, false)
                .Build();

            // Add access to generic IConfigurationRoot
            services.AddSingleton<IConfigurationRoot>(Configuration);

            // Add EmailApp class to read Emails
            services.AddTransient<EmailApp>();

            // Configuration of DbContext from MyMusic.Api -> StartUp.cs
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<MyMusicDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString(connectionStringName),
                                     x => x.MigrationsAssembly("MyMusic.Data")));

            services.AddTransient<IMusicService, MusicService>();
            services.AddTransient<IArtistService, ArtistService>();

            // Analog of services.AddControllers(); from MyMusic.Api -> StartUp.cs
            services.AddTransient<ArtistsController>();
            services.AddTransient<MusicsController>();

        }
    }
}
