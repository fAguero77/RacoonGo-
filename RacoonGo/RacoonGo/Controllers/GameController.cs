using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{

    public GameController()
    {
        


    }

    [HttpPost]
    public async Task<IActionResult> AddGame(Game game)
    {
        await FirebaseRealtimeDatabase.Instance.SetGame(game.id, game);
        
       return Ok(game);
    }


}
