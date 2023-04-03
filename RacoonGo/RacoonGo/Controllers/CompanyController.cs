using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    public CompanyController()
    {
        
    }
    
    [HttpPost]
    public async Task<IActionResult> AddCompany(CompanyUser company)
    {
        return Ok(company);
        if (await FirebaseRealtimeDatabase.Instance.SetCompanyUser(company))
        {
            return Ok(company);
        }
        return BadRequest("El usuario ya existe");
    }
}