using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;

namespace RacoonGo.Services
{

    public interface IGeodecodeService
    {
        public async Task<Location> GetLocation(string name);
    }

}