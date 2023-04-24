using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;
using RacoonGo.Services;
using System.Diagnostics.CodeAnalysis;

namespace RacoonGo.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EventsController : ControllerBase
	{

		private readonly IGeodecodeService _service;
		private readonly ISearchService _searchService;

		public EventsController(IGeodecodeService service, ISearchService searchService)
		{
			_service = service;
			_searchService = searchService;
		}


		[HttpPost("addEvent")]
		public async Task<IActionResult> AddEvent(Event e)
		{
			Location location = _service.GetLocation(e.location.name).Result;
			if (location == null)
			{
				return NotFound(e);
			}

			if (e.photoUrl.Length == 0)
			{
				e.photoUrl = "https://cdnph.upi.com/ph/st/th/5751650313577/2022/i/16503136903474/v1.2/Raccoon-bandit-evicted-from-trash-can-by-Michigan-police.jpg";

			}
			e.location = location;
			await FirebaseRealtimeDatabase.Instance.SetEvent(e.user.email, e);
			return Ok(e);
		}

		[HttpGet("events")]
		public async Task<IActionResult> GetEvents()
		{
			//Event[] eventList = _crudFirebase.getEvents().Result;
			var events = await FirebaseRealtimeDatabase.Instance.GetAllEvents();


			return Ok(events);
		}

		[HttpGet("myEvents")]
		public async Task<IActionResult> GetMyEvents(String email)
		{
			var myevents = await FirebaseRealtimeDatabase.Instance.GetUserEvents(email);


			return Ok(myevents);
		}

		[HttpDelete("delete/{body}")]
		public async Task<IActionResult> DeleteEvent(String body)
		{
			string email = body.Substring(0, body.IndexOf('&'));
			string id = body.Substring(body.IndexOf('&') + 1);
			await FirebaseRealtimeDatabase.Instance.DeleteEvent(email, id);

			return Ok();
		}

		[HttpGet("search")]
		public IActionResult Search(string? query)
		{
			if (query == null)
			{
				return Ok(FirebaseRealtimeDatabase.Instance.GetAllEvents());
			}

			HashSet<Event> events = _searchService.SearchEvents(query);
			return Ok(events);
		}

		[HttpPost("searchAdvance")]
		public IActionResult SearchAdvance(Event e)
		{
			if (e == null)
			{
				return Ok(FirebaseRealtimeDatabase.Instance.GetAllEvents());
			}

			HashSet<Event> events = _searchService.SearchEvents(e);
			return Ok(events);
		}
	}

}