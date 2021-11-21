using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GenericHostExample.Core.Models;
using GenericHostExample.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GenericHostExample.WorkerService
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IWeatherService _weatherService;

        public Worker(ILogger<Worker> logger, IWeatherService weatherService)
        {
            _logger = logger;
            _weatherService = weatherService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await Task.Delay(1000, stoppingToken);

                // Run the Weather Forecast code:
                try
                {
                    IReadOnlyList<WeatherForecast> forecasts = await _weatherService.GetFiveDayTemperaturesAsync();
                    foreach (var forecast in forecasts)
                        _logger.LogInformation($"{forecast.Date.ToLongDateString()} : {forecast.TemperatureC}°C ({forecast.TemperatureF}°F) {forecast.Summary}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Unhandled exception!");
                }
            }
        }
    }
}
