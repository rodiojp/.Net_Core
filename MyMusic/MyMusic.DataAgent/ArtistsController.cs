using Microsoft.Extensions.Logging;
using MyMusic.Core.Models;
using MyMusic.Core.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMusic.DataAgent
{
    public class ArtistsController : LoggerController<ArtistsController>
    {
        private readonly IArtistService _artistService;

        public ArtistsController(ILogger<ArtistsController> logger, IArtistService ArtistService) : base(logger)
        {
            _artistService = ArtistService;
        }

        public async Task<List<Artist>> GetAllArtists()
        {
            List<Artist> artists = await _artistService.GetAllArtists();
            Print<Artist>(artists);
            return artists;
        }
        public async Task<Artist> GetArtistById(int id)
        {
            var artist = await _artistService.GetArtistById(id);
            Print<Artist>(artist);
            return artist;
        }

        public async Task<Artist> CreateArtist(Artist artistToCreate)
        {
            var newArtist = await _artistService.CreateArtist(artistToCreate);
            Print<Artist>(newArtist);
            var artist = await _artistService.GetArtistById(newArtist.Id);
            Print<Artist>(artist);
            return artist;
        }

    }
}
