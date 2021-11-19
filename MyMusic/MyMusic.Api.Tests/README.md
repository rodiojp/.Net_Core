# Api Tests

## Microsoft Extensions Logging
- `Install-Package Microsoft.Extensions.Logging -Version 5.0.0 -ProjectName "MyMusic.Api.Tests"`
- `Install-Package Moq.EntityFrameworkCore -Version 5.0.0.2 -ProjectName "MyMusic.Api.Tests"`


## Test AutoMapper

Unit Test and Mock Automapper ASP.NET Core [article](https://www.thecodebuzz.com/unit-test-mock-automapper-asp-net-core-imapper/)


## Test Task results

StackOverflow.com: How can I tell Moq to return a Task? [Response](https://stackoverflow.com/questions/21253523/how-can-i-tell-moq-to-return-a-task#answer-21256276)

```C#
var testItems = new List<Artist>() { new Artist() { Id = 1, Name = "John Lennon" } };
var mockArtistService = new Mock<IArtistService>();
mockArtistService.Setup(service => service.GetAllArtists())
                 .Returns(Task.FromResult(testItems));
```