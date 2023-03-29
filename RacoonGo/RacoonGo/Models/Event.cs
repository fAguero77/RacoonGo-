using Microsoft.AspNetCore.Mvc;

namespace RacoonGo.Modelo
{
    public enum Theme
    {
        Archeology = 0,
        Biology,
        Astronomy,
        Physics,
        Nutrition,
        Psicology,
        Investigation,
        Art,
        History,
        Others
    }
    public class Event
    {
        public string Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int recommendedAge { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public List<int> themes { get; set; }
        public Location location { get; set; }

        public User user { get; set; }

        public string photoUrl { get; set; }

        public Event() { }
    }
}

