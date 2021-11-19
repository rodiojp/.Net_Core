using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace MyMusic.DataAgent
{
    public class LoggerController<T> where T : class
    {
        private readonly ILogger<T> _logger;

        public LoggerController(ILogger<T> logger)  
        {
            _logger = logger;
        }

        protected virtual void Print<I>(I item)
        {
            _logger.LogInformation(item.ToString());
        }

        protected virtual void Print<I>(IEnumerable<I> items)
        {
            foreach (var item in items)
            {
                Print<I>(item);
            }
        }
    }
}
