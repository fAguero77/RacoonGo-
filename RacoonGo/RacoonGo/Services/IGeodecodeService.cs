using Microsoft.AspNetCore.Mvc;
using RacoonGo.Models;

namespace RacoonGo.Services
{

    public interface IGeodecodeService
    {
        Task<Location> GetLocation(string name);
    }

}