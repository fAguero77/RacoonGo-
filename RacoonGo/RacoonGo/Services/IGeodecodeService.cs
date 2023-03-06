using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;

namespace RacoonGo.Services
{

    public interface IGeodecodeService
    {
        Task<Location> GetLocation(string name);
    }

}