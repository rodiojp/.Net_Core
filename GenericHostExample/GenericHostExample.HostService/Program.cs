using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericHostExample.Core.Models;
using GenericHostExample.Services;
using GenericHostExample.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GenericHostExample.HostService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<Worker>();
                    services.AddSingleton<IWeatherService, WeatherService>();

                    services.AddOptions<WeatherSettings>().Bind(hostContext.Configuration.GetSection("Weather"));
                });
    }
}
