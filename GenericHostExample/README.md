

[Understanding .NET Generic Host Model](https://sahansera.dev/dotnet-core-generic-host/)

- `md GenericHostExample`
- `cd GenericHostExample`
- `dotnet new webapi -n GenericHostExample.Api`
- `dotnet new worker -n GenericHostExample.WorkerService`
- `dotnet new sln`
- `dotnet sln add GenericHostExample.Api GenericHostExample.WorkerService`

## Install Packages:
- `Install-Package Microsoft.Extensions.Hosting -Version 5.0.0 -ProjectName GenericHostExample.Services`

