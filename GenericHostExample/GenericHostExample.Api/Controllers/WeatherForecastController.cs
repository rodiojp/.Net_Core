using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericHostExample.Core.Models;
using GenericHostExample.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GenericHostExample.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWeatherService _weatherService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherService weatherService)
        {
            _logger = logger;
            _weatherService = weatherService;
        }

        [HttpGet]
        public async Task<IReadOnlyList<WeatherForecast>> Get()
        {
            IReadOnlyList<WeatherForecast> forecasts = await _weatherService.GetFiveDayTemperaturesAsync();
            return forecasts;
        }
    }
}
