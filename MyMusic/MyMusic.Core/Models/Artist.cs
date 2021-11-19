using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace MyMusic.Core.Models
{

    public class Artist
    {
        //public Artist()
        //{
        //    Musics = new List<Music>();
        //}

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual List<Music> Musics { get; set; }

        public override string ToString()
        {
            return $"\"{this.GetType().Name}\": {{ \"Id\": {Id}, \"Name\": \"{Name}\" }}";
        }
    }
}

