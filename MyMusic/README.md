# Building a multi layer .NET Core 3.0 API from zero

[Article](https://medium.com/swlh/building-a-nice-multi-layer-net-core-3-api-c68a9ef16368) 
The source of application is available [here](https://github.com/alopes2/Medium-MyMusic)


- `md MyMusic`
- `cd MyMusic`
 
- `dotnet new solution`

- `dotnet new webapi -o MyMusic.Api`
- `dotnet new classlib -o MyMusic.Core`
- `dotnet new classlib -o MyMusic.Services`
- `dotnet new classlib -o MyMusic.Data`


- `dotnet add MyMusic.Api/MyMusic.Api.csproj reference MyMusic.Core/MyMusic.Core.csproj MyMusic.Services/MyMusic.Services.csproj`
- `dotnet add MyMusic.Data/MyMusic.Data.csproj reference MyMusic.Core/MyMusic.Core.csproj`
- `dotnet add MyMusic.Services/MyMusic.Services.csproj reference MyMusic.Core/MyMusic.Core.csproj`
- `dotnet add MyMusic.Api/MyMusic.Api.csproj reference MyMusic.Services/MyMusic.Services.csproj MyMusic.Core/MyMusic.Core.csproj MyMusic.Data/MyMusic.Data.csproj`

#### MyMusic.Core

#### MyMusic.Data

`Install-Package Microsoft.EntityFrameworkCore.Design -Version 5.0.12 -ProjectName "MyMusic.Data"`
`Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 5.0.12 -ProjectName "MyMusic.Data"`
`Install-Package Microsoft.EntityFrameworkCore.Tools -Version 5.0.12 -ProjectName "MyMusic.Data"`


`Install-Package Microsoft.EntityFrameworkCore.Design -Version 5.0.12 -ProjectName "MyMusic.Api"`


Add-Migration InitialCreate -StartupProject MyMusic.Api -Project MyMusic.Data -OutputDir Migrations

<dotnet ef --startup-project MyMusic.Api/MyMusic.Api.csproj migrations add InitialModel -p MyMusic.Data/MyMusic.Data.csproj>

Update-Database -StartupProject MyMusic.Api

<dotnet ef --startup-project MyMusic.Api/MyMusic.Api.csproj database update>

Add-Migration SeedMusicsAndArtistsTable -StartupProject MyMusic.Api -Project MyMusic.Data -OutputDir Migrations

<dotnet ef --startup-project MyMusic.Api/MyMusic.Api.csproj migrations add SeedMusicsAndArtistsTable -p MyMusic.Data/MyMusic.Data.csproj>

startup-project switch tells that MyMusic.Api is the entry project for our app and 
switch -p tells that the target project of our migrations is MyMusic.Data. 
InitialModel is the name of this migration.


dotnet add MyMusic.Api/MyMusic.Api.csproj package Swashbuckle.AspNetCore --version 5.0.0-rc3

dotnet add MyMusic.Api/MyMusic.Api.csproj package AutoMapper 
dotnet add MyMusic.Api/MyMusic.Api.csproj package AutoMapper.Extensions.Microsoft.DependencyInjection

Install-Package AutoMapper -Version 10.1.1 -ProjectName "MyMusic.Api"
Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection -Version 8.1.1 -ProjectName "MyMusic.Api"

dotnet add MyMusic.Api/MyMusic.Api.csproj package FluentValidation

###FluentValidation###
[Documentation](https://docs.fluentvalidation.net/en/latest/aspnet.html)

Install-Package FluentValidation -Version 10.3.4 -ProjectName "MyMusic.Api"
Install-Package FluentValidation.AspNetCore -Version 10.3.4 -ProjectName "MyMusic.Api"

Article:  [Using FluentValidation in ASP.NET Core](https://wildermuth.com/2019/11/18/Using-FluentValidation-in-ASP-NET-Core)

[Fluent Validation with Swagger in Asp.net Core](https://stackoverflow.com/questions/44638195/fluent-validation-with-swagger-in-asp-net-core)

PM> get-help add-migration -detailed

NAME
    Add-Migration
    
SYNOPSIS
    Adds a new migration.
    
    
SYNTAX
    Add-Migration [-Name] <String> [-OutputDir <String>] [-Context <String>] [-Project <String>] [-StartupProject <String>] [-Namespace <String>] [-Args <String>] [<CommonParameters>]
    
    
DESCRIPTION
    Adds a new migration.
    

PARAMETERS
    -Name <String>
        The name of the migration.
        
    -OutputDir <String>
        The directory to put files in. Paths are relative to the project directory. Defaults to "Migrations".
        
    -Context <String>
        The DbContext to use.
        
    -Project <String>
        The project to use.
        
    -StartupProject <String>
        The startup project to use. Defaults to the solution's startup project.
        
    -Namespace <String>
        The namespace to use. Matches the directory by default.
        
    -Args <String>
        Arguments passed to the application.
        
    <CommonParameters>
        This cmdlet supports the common parameters: Verbose, Debug,
        ErrorAction, ErrorVariable, WarningAction, WarningVariable,
        OutBuffer, PipelineVariable, and OutVariable. For more information, see 
        about_CommonParameters (https:/go.microsoft.com/fwlink/?LinkID=113216). 
    
REMARKS
    To see the examples, type: "get-help Add-Migration -examples".
    For more information, type: "get-help Add-Migration -detailed".
    For technical information, type: "get-help Add-Migration -full".
    For online help, type: "get-help Add-Migration -online"



