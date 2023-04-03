using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;

namespace RacoonGo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    CRUDFirebase _crudFirebase = new CRUDFirebase();
    
    public CompanyController()
    {
        
    }
    
    [HttpPost]
    public async Task<IActionResult> AddCompany(CompanyUser company)
    {
        if (await _crudFirebase.addCompany(company))
        {
            return Ok(company);
        }
        return BadRequest("El usuario ya existe");
    }
}