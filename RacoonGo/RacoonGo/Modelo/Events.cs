using Microsoft.AspNetCore.Mvc;

namespace RacoonGo.Modelo
{
    enum Theme
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
    public class Events
    {
        private String _title;
        private String _description;
        private int _recommendedAge;
        private DateTime _startDate;
        private DateTime _endDate;
        private LinkedList<Theme> _themes;
        private Location _location;

        public Events()
        {

        }

        




    }
}