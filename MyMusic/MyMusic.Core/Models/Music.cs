using System.ComponentModel.DataAnnotations;

namespace MyMusic.Core.Models
{
    public class Music
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }

        public override string ToString()
        {
            return $"\"{this.GetType().Name}\": {{ \"Id\": {Id}, \"Name\": \"{Name}\", {Artist} }}";
        }

    }
}
