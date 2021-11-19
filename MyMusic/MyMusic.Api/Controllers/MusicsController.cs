﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyMusic.Api.Resources;
using MyMusic.Api.Validators;
using MyMusic.Core.Models;
using MyMusic.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMusic.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicsController : ControllerBase
    {
        private readonly ILogger<MusicsController> _logger;
        private readonly IMusicService _musicService;
        private readonly IMapper _mapper;

        public MusicsController(ILogger<MusicsController> logger, IMusicService musicService, IMapper mapper)
        {
            _musicService = musicService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MusicResource>>> GetAllMusics()
        {
            var musics = await _musicService.GetAllWithArtist();
            var musicResources = _mapper.Map<IEnumerable<Music>, IEnumerable<MusicResource>>(musics);

            return Ok(musicResources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MusicResource>> GetMusicById(int id)
        {
            var music = await _musicService.GetMusicById(id);
            var musicResource = _mapper.Map<Music, MusicResource>(music);

            return Ok(musicResource);
        }

        [HttpPost]
        public async Task<ActionResult<MusicResource>> CreateMusic([FromBody] SaveMusicResource saveMusicResource)
        {
            //    var validator = new SaveMusicResourceValidator();
            //    var validationResult = await validator.ValidateAsync(saveMusicResource);

            //    if (!validationResult.IsValid)
            //        return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this needs refining, but for demo it is ok
            }

            var musicToCreate = _mapper.Map<SaveMusicResource, Music>(saveMusicResource);

            var newMusic = await _musicService.CreateMusic(musicToCreate);

            var music = await _musicService.GetMusicById(newMusic.Id);

            var musicResource = _mapper.Map<Music, MusicResource>(music);

            return Ok(musicResource);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MusicResource>> UpdateMusic(int id, [FromBody] SaveMusicResource saveMusicResource)
        {
            //var validator = new SaveMusicResourceValidator();
            //var validationResult = await validator.ValidateAsync(saveMusicResource);

            //var requestIsInvalid = id == 0 || !validationResult.IsValid;

            //if (requestIsInvalid)
            //    return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this needs refining, but for demo it is ok
            }

            var musicToBeUpdate = await _musicService.GetMusicById(id);

            if (musicToBeUpdate == null)
                return NotFound();

            var music = _mapper.Map<SaveMusicResource, Music>(saveMusicResource);

            await _musicService.UpdateMusic(musicToBeUpdate, music);

            var updatedMusic = await _musicService.GetMusicById(id);
            var updatedMusicResource = _mapper.Map<Music, MusicResource>(updatedMusic);

            return Ok(updatedMusicResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMusic(int id)
        {
            if (id == 0)
                return BadRequest();

            var music = await _musicService.GetMusicById(id);

            if (music == null)
                return NotFound();

            await _musicService.DeleteMusic(music);

            return NoContent();
        }

    }
}
