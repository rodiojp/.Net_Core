using Microsoft.Extensions.Logging;
using NUnit.Framework;
using MyMusic.Api.Controllers;
using MyMusic.Core.Services;
using AutoMapper;
using MyMusic.Services;
using Microsoft.AspNetCore.Mvc;
using MyMusic.Api.Resources;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMusic.Data;
using Moq;
using MyMusic.Core.Models;
using MyMusic.Api.Mapping;
using System.Net;

namespace MyMusic.Api.Tests
{
    public class ArtistsControllerTest
    {
        private readonly ILogger<ArtistsController> _mockLogger = new Mock<ILogger<ArtistsController>>().Object;
        private readonly IMapper _mapper;

        public ArtistsControllerTest()
        {
            if (_mapper == null)
            {
                var mappingConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new MappingProfile());
                });
                IMapper mapper = mappingConfig.CreateMapper();
                _mapper = mapper;
            }
        }

        [SetUp]
        public void Setup()
        {

        }
        [Test]
        public void ShouldReturnAllArtists()
        {
            var testItems = new List<Artist>() { new Artist() { Id = 1, Name = "John Lennon" } };
            var mockArtistService = new Mock<IArtistService>();
            mockArtistService.Setup(service => service.GetAllArtists())
                                                      .Returns(Task.FromResult(testItems));


            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);
            Task<ActionResult<List<ArtistResource>>> taskActionResultListOfArtists = controller.GetAllArtists();
            ActionResult<List<ArtistResource>> actionResultListOfArtists = taskActionResultListOfArtists.Result;
            ActionResult actionResult = actionResultListOfArtists.Result;

            Assert.IsInstanceOf(typeof(OkObjectResult), actionResult);

            ObjectResult objectResult = actionResult as ObjectResult;
            List<ArtistResource> result = objectResult.Value as List<ArtistResource>;

            Assert.AreEqual(testItems.Count, result.Count());
            Assert.AreEqual(testItems[0].Id, result[0].Id);
            Assert.AreEqual(testItems[0].Name, result[0].Name);
        }


        [Test]
        public void ShouldGetArtistById()
        {
            var testItem = new Artist() { Id = 1, Name = "John Lennon" };
            var mockArtistService = new Mock<IArtistService>();
            mockArtistService.Setup(service => service.GetArtistById(testItem.Id))
                                                      .Returns(Task.FromResult(testItem));


            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);
            Task<ActionResult<ArtistResource>> taskActionResultArtist = controller.GetArtistById(testItem.Id);
            ActionResult<ArtistResource> actionResultArtist = taskActionResultArtist.Result;
            ActionResult actionResult = actionResultArtist.Result;

            Assert.IsInstanceOf(typeof(OkObjectResult), actionResult);

            ObjectResult objectResult = actionResult as ObjectResult;
            ArtistResource result = objectResult.Value as ArtistResource;

            Assert.AreEqual(testItem.Id, result.Id);
            Assert.AreEqual(testItem.Name, result.Name);
        }

        [Test]
        public void ShouldReturn404ForIncorrectArtistId()
        {
            var testItem = new Artist() { Id = 1, Name = "John Lennon" };
            var mockArtistService = new Mock<IArtistService>();
            mockArtistService.Setup(service => service.GetArtistById(testItem.Id))
                                                      .Returns(Task.FromResult(testItem));


            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);

            int testId = 2;
            Task<ActionResult<ArtistResource>> taskActionResultArtist = controller.GetArtistById(testId);
            ActionResult<ArtistResource> actionResultArtist = taskActionResultArtist.Result;
            ActionResult actionResult = actionResultArtist.Result;

            Assert.IsInstanceOf(typeof(NotFoundResult), actionResult);
        }

        [Test]
        public void ShouldUpdateArtistName()
        {
            var artistToBeUpdated = new Artist() { Id = 1, Name = "John Lennon" };
            var updatedArtist = new Artist() { Id = artistToBeUpdated.Id, Name = "Dima Bilan" };
            var saveArtistResource = new SaveArtistResource() { Name = updatedArtist.Name };

            var mockArtistService = new Mock<IArtistService>();
            mockArtistService.Setup(service => service.UpdateArtist(artistToBeUpdated, updatedArtist));
            mockArtistService.Setup(service => service.GetArtistById(updatedArtist.Id))
                                                      .Returns(Task.FromResult(updatedArtist));


            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);

            Task<ActionResult<ArtistResource>> taskActionResultArtist = controller.UpdateArtist(artistToBeUpdated.Id, saveArtistResource);
            ActionResult<ArtistResource> actionResultArtist = taskActionResultArtist.Result;
            ActionResult actionResult = actionResultArtist.Result;

            Assert.IsInstanceOf(typeof(OkObjectResult), actionResult);

            ObjectResult objectResult = actionResult as ObjectResult;
            ArtistResource result = objectResult.Value as ArtistResource;

            Assert.AreEqual(updatedArtist.Id, result.Id);
            Assert.AreEqual(updatedArtist.Name, result.Name);
        }

        [Test]
        public void ShouldDeleteArtistByArtistId()
        {
            var testItem = new Artist() { Id = 1, Name = "John Lennon" };
            var mockArtistService = new Mock<IArtistService>();
            mockArtistService.Setup(service => service.DeleteArtist(testItem));

            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);

            Task<IActionResult> taskActionResult = controller.DeleteArtist(testItem.Id);
            IActionResult actionResult = taskActionResult.Result;

            Assert.IsInstanceOf(typeof(NoContentResult), actionResult);
        }

        [Test]
        public void ShouldCreateArtistName()
        {
            var saveArtistResource = new SaveArtistResource() { Name = "John Lennon" };
            var artistToCreate = _mapper.Map<SaveArtistResource, Artist>(saveArtistResource);
            var createdArtist = new Artist() { Id = artistToCreate.Id + 1, Name = saveArtistResource.Name };

            var mockArtistService = new Mock<IArtistService>();

            // Used -= It.IsAny<Artist>() =- not a specific instance of Artist()
            mockArtistService.Setup(service => service.CreateArtist(It.IsAny<Artist>()))
                                                      .Returns(Task.FromResult(createdArtist));
            mockArtistService.Setup(service => service.GetArtistById(createdArtist.Id))
                                                      .Returns(Task.FromResult(createdArtist));


            ArtistsController controller = new ArtistsController(_mockLogger, mockArtistService.Object, _mapper);

            Task<ActionResult<ArtistResource>> taskActionResultArtist = controller.CreateArtist(saveArtistResource);
            ActionResult<ArtistResource> actionResultArtist = taskActionResultArtist.Result;
            ActionResult actionResult = actionResultArtist.Result;

            Assert.IsInstanceOf(typeof(OkObjectResult), actionResult);

            ObjectResult objectResult = actionResult as ObjectResult;
            ArtistResource result = objectResult.Value as ArtistResource;

            Assert.AreEqual(createdArtist.Id, result.Id);
            Assert.AreEqual(createdArtist.Name, result.Name);
        }
    }
}