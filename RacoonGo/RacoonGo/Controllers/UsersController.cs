using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Modelo;
using RacoonGo.Services;

namespace RacoonGo.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    CRUDFirebase _crudFirebase = new CRUDFirebase();

    public UsersController()
    {


    }

    [HttpPost]
    public IActionResult AddUser(User user)
    {
        _crudFirebase.addUser(user);
        return Ok(user);
    }

    
    [HttpGet]
    public IActionResult signIn(string email)
    {

        User usuario = _crudFirebase.getUser(email).Result[0];
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


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(String id)
    {
        try
        {
            //await FirebaseRealtimeDatabase.Instance.DeleteAllUsersEvents(id);
            // TODO: DeleteAllUsersGames
            //await FirebaseRealtimeDatabase.Instance.DeleteUser(id);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
}