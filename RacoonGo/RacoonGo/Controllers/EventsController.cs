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
            // TODO AÑADIR EVENTO A BBDD
            return Ok(e);
        }

        [HttpGet]
        public IActionResult GetEvents()
        {
            Event e1 = new()
            {
                title = "Evento 1",
                description = "descripcion evento 1",
                recommendedAge = 5,
                startDate = DateTime.Now,
                endDate = DateTime.Now,
                themes = new List<int>{ 0, 1 },
                location = Location.Valencia()
            };

            Event e2 = new()
            {
                title = "Evento 2",
                description = "descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. descripcion muy larga del evento 2. ",
                recommendedAge = 15,
                startDate = DateTime.MinValue,
                endDate = DateTime.MaxValue,
                themes = new List<int>{ 0,1,2,3,4,5,6,7 },
                location = Location.Valencia()
            };

            Event e3 = new()
            {
                title = "Evento 2",
                recommendedAge = 80,
                startDate = DateTime.MinValue,
                endDate = DateTime.MaxValue,
                themes = new List<int>{ 0, 1, 2, 3 },
                location = Location.Valencia()
            };


            Event[] events = { e1, e2, e3 };

            // TODO: get events from DB
            return Ok(events);
        }
    }

}