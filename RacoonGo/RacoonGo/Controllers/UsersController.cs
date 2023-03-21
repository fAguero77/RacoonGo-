using Microsoft.AspNetCore.Mvc;
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
    
}