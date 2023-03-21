using System.Transactions;

namespace RacoonGo.Modelo;

public class CompanyUser : User{
    public String phonenumber { get;set; } 
    public String website { get;set; }
    public String highlited { get; set; }

    public CompanyUser() { }

    public CompanyUser(String username, String email, int score, String phonenumber, String website, String highlited) {
        this.username = username;
        this.email = email;
        this.score = score;
        this.phonenumber = phonenumber;
        this.website = website;
        this.highlited = highlited;
    }
}