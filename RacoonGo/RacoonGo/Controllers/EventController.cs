using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;
using RacoonGo.Services;

namespace RacoonGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {


        private readonly IGeodecodeService _service;

        public EventController(IGeodecodeService service)
        {
            _service = service;
        }


        [HttpPost("addEvent")]
        public async Task<Location> AddLocation([FromQuery] string name)
        {
            try
            {
                Location response = await _service.GetLocation(name);
                return response;

            }
            catch (Exception ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }
    }
}