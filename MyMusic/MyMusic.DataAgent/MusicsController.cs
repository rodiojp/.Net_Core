using Microsoft.Extensions.Logging;
using MyMusic.Core.Models;
using MyMusic.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMusic.DataAgent
{
    public class MusicsController : LoggerController<MusicsController>
    {
        private readonly IMusicService _musicService;

        public MusicsController(ILogger<MusicsController> logger, IMusicService MusicService) : base(logger)
        {
            _musicService = MusicService;
        }

        public async Task<IEnumerable<Music>> GetAllMusics()
        {
            List<Music> musics = await _musicService.GetAllWithArtist();
            Print<Music>(musics);
            return musics;
        }
        public async Task<Music> GetMusicById(int id)
        {
            var music = await _musicService.GetMusicById(id);
            Print<Music>(music);
            return music;
        }
    }
}
