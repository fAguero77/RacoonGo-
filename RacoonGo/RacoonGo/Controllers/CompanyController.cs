using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    public CompanyController() { }
    
    [HttpPost]
    public async Task<IActionResult> AddCompany(CompanyUser company)
    {
        if (await FirebaseRealtimeDatabase.Instance.SetCompanyUser(company))
        {
            return Ok(company);
        }
        return BadRequest("El usuario ya existe");
    }

    [HttpGet]
    public async Task<IActionResult> signIn(String email)
    {
        CompanyUser usuario = await FirebaseRealtimeDatabase.Instance.GetCompanyUser(email);
        if (usuario == null)
        {
            return BadRequest();
        }
        return Ok(usuario);
    }

}