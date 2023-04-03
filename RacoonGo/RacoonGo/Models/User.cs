namespace RacoonGo.Models
{

    public class User
    {
        public string username { get; set; }
        public string email { get; set; }
        public int score { get; set; }

        public User()
        {

        }

        public User(string username, string email, int score)
        {
            this.username = username;
            this.email = email;
            this.score = score;
        }


        public string toString()
        {
            return "Username: " + username + " Email: " + email + " Score: " + score;
        }
    }
}
