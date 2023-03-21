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

        CRUDFirebase _crudFirebase = new CRUDFirebase();

        private readonly IGeodecodeService _service;

        public EventsController(IGeodecodeService service)
        {
            _service = service;
        }


        [HttpPost("addEvent")]
        public IActionResult AddEvent(Event e)
        {
            Location location = _service.GetLocation(e.location.name).Result;
            if (location == null)
            {
                return NotFound(e);
            }
            e.location = location;
            _crudFirebase.addEvent(e);
            return Ok(e);
        }

        [HttpGet("events")]
        public IActionResult GetEvents()
        {
            Event[] eventList = _crudFirebase.getEvents().Result;
            

            return Ok(eventList);
        }

        [HttpGet("myEvents")]
        public IActionResult GetMyEvents(String username)
        {
            Console.WriteLine(username);
            Event[] eventList = _crudFirebase.getMyEvents(username).Result;


            return Ok(eventList);
        }
    }

}