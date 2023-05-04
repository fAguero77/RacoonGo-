using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Controllers;
public class GameUserRequest
{
    public Game game { get; set; }
    public User user { get; set; }
}
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{

    public UsersController()
    {


    }

    [HttpPost]
    public async Task<IActionResult> AddUser(User user)
    {
        if (await FirebaseRealtimeDatabase.Instance.SetUser(user,true))
        {
            return Ok(user);
        }
        return BadRequest("El usuario ya existe");
    }

    
    [HttpGet]
    public async Task<IActionResult> signIn(string email)
    {

        User usuario = await FirebaseRealtimeDatabase.Instance.GetUser(email);
        if (usuario == null)
        {
            return BadRequest();
        }
        return Ok(usuario);
    }

    [HttpPost("sponsor")]
    public async Task<IActionResult> SetSponsor(CompanyUser user, int days)
    {
        //// update sponsor days
        user.sponsored.AddDays(days);

        // update values in database
        await FirebaseRealtimeDatabase.Instance.SetCompanyUser(user);

        // return updated data
        return Ok(user);
    }

    [HttpPost("completeGame")]
    public async Task<IActionResult> SetFinishedGame(GameUserRequest request)
    {
        // update values in database
        await FirebaseRealtimeDatabase.Instance.SetUser(request.user,false);
        await FirebaseRealtimeDatabase.Instance.SetGame(request.user.email,request.game);


        // return updated data

        return Ok(request.game);

    }


        [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            await FirebaseRealtimeDatabase.Instance.DeleteUser(id);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
}