namespace RacoonGo.Modelo {

    public class User
    {
        public String username { get; set; }
        public String email { get; set; }
        public int score { get; set; }

        public User()
        {

        }

        public User(String username, String email, int score)
        {
            this.username = username;
            this.email = email;
            this.score = score;
        }


        public String toString()
        {
            return "Username: " + username + " Email: " + email + " Score: " + score;
        }
    }
}
