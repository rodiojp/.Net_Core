using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMusic.DataAgent
{
    public class EmailApp
    {
        private readonly IConfigurationRoot _config;
        private readonly ILogger<EmailApp> _logger;

        public EmailApp(IConfigurationRoot config, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EmailApp>();
            _config = config;
        }

        /// <summary>
        /// Read Configuration branch "EmailAddress" 
        /// </summary>
        /// <returns></returns>
        public async Task Run()
        {
            //using Microsoft.Extensions.Configuration -> static class ConfigurationBinder -> T Get<T>(this IConfiguration configuration)  
            List<string> emailAddresses = _config.GetSection("EmailAddresses").Get<List<string>>();
            foreach (string emailAddress in emailAddresses)
            {
                _logger.LogInformation("Email address: {@EmailAddress}", emailAddress);
            }
        }
    }
}
