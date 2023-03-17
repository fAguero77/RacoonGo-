using Microsoft.AspNetCore.Mvc;

namespace RacoonGo.Modelo
{
 
    public class Location
    {
        public string name { get; set; }
        public double lat { get; set; }
        public double lon { get; set; }

        public Location() { }
        public Location(string name, double lat, double lon)
        {
            this.name = name;
            this.lat = lat;
            this.lon = lon;
        }

        public static Location Valencia()
        {
            return new Location("Valencia", 39.466667, -0.375000);
        }
    }
}