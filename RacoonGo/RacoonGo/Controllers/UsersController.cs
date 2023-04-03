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
    public async Task<IActionResult> AddUser(User user)
    {
        await FirebaseRealtimeDatabase.Instance.SetUser(user);
        return Ok(user);
    }

    
    [HttpGet]
    public async Task<IActionResult> signIn(string email)
    {

        User usuario = await FirebaseRealtimeDatabase.Instance.GetUser(email);
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

}