using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RacoonGo.Modelo;

namespace RacoonGo.Services
{

    public class GeodcodeService : IGeodecodeService
    {
        private const string API_KEY = "81d4e70bed1b067e738e3fd5861f4c3d";
        private const string URI_COORDS_BY_NAME = "http://api.openweathermap.org/geo/1.0/direct?q={0}&appid={1}";
        HttpClient client = new HttpClient();
        
        public async Task<Location> GetLocation(string name)
        {
            HttpResponseMessage response = await client.GetAsync(new Uri(string.Format(URI_COORDS_BY_NAME, name, API_KEY)));
            string responseData = await response.Content.ReadAsStringAsync();
            List<Location> dataObject = JsonConvert.DeserializeObject<List<Location>>(responseData);
            return dataObject[0];
        }
    }

}