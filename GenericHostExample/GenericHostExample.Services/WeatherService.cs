using GenericHostExample.Core.Models;
using GenericHostExample.Services.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GenericHostExample.Services
{
    public sealed class WeatherService : IWeatherService
    {
        private readonly IOptions<WeatherSettings> _weatherSettings;

        public WeatherService(IOptions<WeatherSettings> weatherSettings)
        {
            _weatherSettings = weatherSettings;
        }

        public Task<IReadOnlyList<WeatherForecast>> GetFiveDayTemperaturesAsync()
        {
            var rng = new Random();
            var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = _weatherSettings.Value.Summaries[rng.Next(_weatherSettings.Value.Summaries.Length)]
            })
            .ToList();
            return Task.FromResult<IReadOnlyList<WeatherForecast>>(forecasts);
        }
    }
}