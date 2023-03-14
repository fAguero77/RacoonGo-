using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;
using RacoonGo.Services;
using System.Diagnostics.CodeAnalysis;

namespace RacoonGo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController: ControllerBase
    {


        private readonly IGeodecodeService _service;

        public EventsController(IGeodecodeService service)
        {
            _service = service;
        }


        [HttpPost]
        public IActionResult AddEvent(Event e)
        {
            Location location = _service.GetLocation(e.location.name).Result;
            if (location == null)
            {
                return NotFound(e);
            }
            e.location = location;
            // Do something with the event object
            return Ok(e);
        }
    }

}