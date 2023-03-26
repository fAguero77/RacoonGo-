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
            Console.WriteLine(e.photoUrl + "aaa");

            if (e.photoUrl.Length == 0)
            {
                e.photoUrl = "https://cdnph.upi.com/ph/st/th/5751650313577/2022/i/16503136903474/v1.2/Raccoon-bandit-evicted-from-trash-can-by-Michigan-police.jpg";

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