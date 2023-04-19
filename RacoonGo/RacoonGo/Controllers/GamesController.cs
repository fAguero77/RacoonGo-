using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{

    public GamesController(){}

    [HttpPost]
    public async Task<IActionResult> AddGame(Game game)
    {
        await FirebaseRealtimeDatabase.Instance.SetGame(game.id, game);
        
       return Ok(game);
    }
    
    [HttpGet("games")]
    public async Task<IActionResult> GetGames()
    {
        var games = await FirebaseRealtimeDatabase.Instance.GetAllGames();
        return Ok(games);
    }
}
