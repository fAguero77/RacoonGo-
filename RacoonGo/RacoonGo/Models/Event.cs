using Microsoft.AspNetCore.Mvc;

namespace RacoonGo.Modelo
{
    public enum Theme
    {
        Archeology,
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
        public String title { get; set; }
        public String description { get; set; }
        public int recommendedAge { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public LinkedList<Theme> themes { get; set; }
        public Location location { get; set; }

        public Event()
        {

        }

        




    }
}