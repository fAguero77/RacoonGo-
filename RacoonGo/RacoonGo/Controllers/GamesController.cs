using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;
using RacoonGo.Services;

namespace RacoonGo.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
	private readonly ISearchService _searchService;

	public GamesController(ISearchService searchService)
	{
		_searchService = searchService;
	}

    [HttpPost]
    public async Task<IActionResult> AddGame(Game game)
    {
        await FirebaseRealtimeDatabase.Instance.SetGame(game.email, game);
        
       return Ok(game);
    }
    


    [HttpGet("games")]
    public async Task<IActionResult> GetGames()
    {
        var games = await FirebaseRealtimeDatabase.Instance.GetPublicGames();
        return Ok(games);
    }

    [HttpGet("myGames")]
    public async Task<IActionResult> GetMyGames(string email)
    {
        Console.WriteLine(email);
        var games = await FirebaseRealtimeDatabase.Instance.GetMyGames(email);
        return Ok(games);
    }
    
    [HttpDelete("deleteGame/{body}")]
    public async Task<IActionResult> DeleteGame(string body)
	{
		string email = body.Substring(0, body.IndexOf('&'));
		string id = body.Substring(body.IndexOf('&') + 1);
		await FirebaseRealtimeDatabase.Instance.DeleteGame(email, id);
		return Ok();
	}

    [HttpGet("search")]
    public IActionResult Search(string? query)
    {
	    if (query == null)
	    {
		    return Ok(FirebaseRealtimeDatabase.Instance.GetAllEvents());
	    }

	    HashSet<Game> games = _searchService.SearchGames(query);
        return Ok(games);
    }

    [HttpPost("searchAdvance")]
    public IActionResult SearchAdvance(Game game)
    {
	    if (game == null)
	    {
		    return Ok(FirebaseRealtimeDatabase.Instance.GetAllEvents());
	    }

	    HashSet<Game> games = _searchService.SearchGames(game);
	    return Ok(games);
    }
}
