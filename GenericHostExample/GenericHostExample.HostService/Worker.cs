using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GenericHostExample.Core.Models;
using GenericHostExample.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GenericHostExample.HostService
{
    public class Worker : IHostedService
    {
        private int? _exitCode;

        private readonly ILogger<Worker> _logger;
        private readonly IHostApplicationLifetime _appLifetime;
        private readonly IWeatherService _weatherService;

        public Worker(ILogger<Worker> logger, IHostApplicationLifetime appLifetime, IWeatherService weatherService)
        {
            _logger = logger;
            _appLifetime = appLifetime;
            _weatherService = weatherService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogDebug($"Starting with arguments: {string.Join(" ", Environment.GetCommandLineArgs())}");
            _appLifetime.ApplicationStarted.Register(() =>
            {
                Task.Run(async () =>
                {
                    try
                    {
                        //_logger.LogInformation("Hello World!");

                        IReadOnlyList<WeatherForecast> forecasts = await _weatherService.GetFiveDayTemperaturesAsync();
                        foreach (var forecast in forecasts)
                            _logger.LogInformation($"{forecast.Date.ToLongDateString()} : {forecast.TemperatureC}°C ({forecast.TemperatureF}°F) {forecast.Summary}");

                        _exitCode = 0;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Unhandled exception!");
                    }
                    finally
                    {
                        // Stop the application once the work is done
                        _appLifetime.StopApplication();
                    }
                });
            });

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogDebug($"Exiting with return code: {_exitCode}");

            // Exit code may be null if the user cancelled via Ctrl+C/SIGTERM
            Environment.ExitCode = _exitCode.GetValueOrDefault(-1);

            return Task.CompletedTask;
        }
    }
}
