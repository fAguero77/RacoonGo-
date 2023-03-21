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
    public IActionResult AddCompany(CompanyUser company)
    {
        _crudFirebase.addCompany(company);
        return Ok(company);
    }
}