

- `Install-Package Microsoft.Extensions.Configuration -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`
- `Install-Package Microsoft.Extensions.Configuration.FileExtensions -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`
- `Install-Package Microsoft.Extensions.Configuration.Json -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`
- `Install-Package Microsoft.Extensions.DependencyInjection -Version 5.0.2 -ProjectName "MyMusic.DataAgent"`

## Serilog Logging Tool: 
Article: [Serilog vs. Microsoft Extensions Logging: Which to Use?](https://onloupe.com/blog/serilog-vs-mel/)

[Serilog](https://serilog.net/) provides diagnostic logging to files, the console, and elsewhere
- `Install-Package Serilog -Version 2.10.0 -ProjectName "MyMusic.DataAgent"`

[Low-level Serilog provider](https://github.com/serilog/serilog-extensions-logging) for Microsoft.Extensions.Logging
- `Install-Package Serilog.Extensions.Logging -Version 3.1.0 -ProjectName "MyMusic.DataAgent"`

[ console sink package pretty-prints log data](https://github.com/serilog/serilog/wiki/Configuration-Basics)
- `Install-Package Serilog.Sinks.Console -Version 4.0.0 -ProjectName "MyMusic.DataAgent"`
## Microsoft Extensions Logging
- `Install-Package Microsoft.Extensions.Logging -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`
- `Install-Package Microsoft.Extensions.Logging.Console -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`
- `Install-Package Microsoft.Extensions.Logging.Debug -Version 5.0.0 -ProjectName "MyMusic.DataAgent"`

# Generic type constraint \<T\>

Article: [where (generic type constraint)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/where-generic-type-constraint)