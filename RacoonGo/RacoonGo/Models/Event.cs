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
        public String id { get;set; }
        public String title { get; set; }
        public String description { get; set; }
        public int recommendedAge { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public List<int> themes { get; set; }
        public Location location { get; set; }

        public User user { get; set; }

        public String photoUrl { get; set; }

        public Event() { }
    }
}

