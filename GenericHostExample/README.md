# .NET Generic Host Model

## Some articles to read:

[Understanding .NET Generic Host Model](https://sahansera.dev/dotnet-core-generic-host/)

[Building a Console App with .NET Generic Host](https://dfederm.com/building-a-console-app-with-.net-generic-host/)

[Hosted Services In ASP.NET Core](https://dotnetcoretutorials.com/2019/01/13/hosted-services-in-asp-net-core/)

## Creating application:

- `md GenericHostExample`
- `cd GenericHostExample`
- `dotnet new classlib -n GenericHostExample.Core`
- `dotnet new classlib -n GenericHostExample.Services`
- `dotnet new webapi -n GenericHostExample.Api`
- `dotnet new worker -n GenericHostExample.WorkerService`
- `dotnet new worker -n GenericHostExample.HostService`
- `dotnet new sln`
- `dotnet sln add GenericHostExample.HostService GenericHostExample.Core GenericHostExample.Services GenericHostExample.Api GenericHostExample.WorkerService`

### Install Packages:
- `Install-Package Microsoft.Extensions.Hosting -Version 5.0.0 -ProjectName GenericHostExample.Services`

## dotnet new

[.NET default templates for dotnet new](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates)