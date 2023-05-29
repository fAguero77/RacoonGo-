using System.Transactions;
using RacoonGo.Models;

namespace RacoonGo.Models;

public class CompanyUser : User{
    public String phoneNumber { get;set; } 
    public String website { get;set; }
    public DateTime sponsored { get; set; }

    public CompanyUser() { }

    public CompanyUser(String username, String email, int score, String phonenumber, String website, DateTime sponsored) {
        this.username = username;
        this.email = email;
        this.score = score;
        this.phoneNumber = phonenumber;
        this.website = website;
        this.sponsored = sponsored;
    }
}

public class SponsorRequest
{
	public string email { get; set; }
	public int days { get; set; }
}
