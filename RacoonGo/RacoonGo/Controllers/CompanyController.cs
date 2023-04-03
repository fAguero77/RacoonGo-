using Microsoft.AspNetCore.Mvc;
using RacoonGo.Database;
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
        await FirebaseRealtimeDatabase.Instance.SetCompanyUser(company);
        return Ok(company);
    }
}