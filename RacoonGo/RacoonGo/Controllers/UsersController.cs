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
    public async Task<IActionResult> AddUser(User user)
    {
        if (await _crudFirebase.addUser(user))
        {
            return Ok(user);
        }
        return BadRequest("El usuario ya existe");
    }

    
    [HttpGet]
    public IActionResult signIn(string email)
    {

        User usuario = _crudFirebase.getUser(email).Result[0];
        return Ok(usuario);
    }
    
}