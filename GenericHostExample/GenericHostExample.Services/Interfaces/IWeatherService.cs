using GenericHostExample.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GenericHostExample.Services.Interfaces
{
    public interface IWeatherService
    {
        Task<IReadOnlyList<WeatherForecast>> GetFiveDayTemperaturesAsync();
    }
}