using Microsoft.AspNetCore.Mvc;

namespace RacoonGo.Services
{

    public interface IGeodecodeService
    {
        public async Task<Location> GetLocation(string name);
    }

}