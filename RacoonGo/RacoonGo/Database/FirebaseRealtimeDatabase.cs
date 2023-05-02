using RacoonGo.Models;
using Newtonsoft.Json;
using System;
using FireSharp.Response;
using RacoonGo.Models;

namespace RacoonGo.Database
{
    public class FirebaseRealtimeDatabase
    {
        // DB -> Users/id_mail_user -> User
        // DB -> CompanyUsers/id_mail_user -> CompanyUser
        // DB -> Events/id_mail_user -> All users events
        // DB -> Events/id_mail_user/id_event -> Event

        private static readonly FirebaseRealtimeDatabase i = new FirebaseRealtimeDatabase();
        static FirebaseRealtimeDatabase() { } // Make sure it's truly lazy
        private FirebaseRealtimeDatabase() { } // Prevent instantiation outside

        public static FirebaseRealtimeDatabase Instance { get { return i; } }

        private readonly string BASE_PATH_ALLUSERS = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Users.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_ALLCOMPANYUSERS = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Users.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Users/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_COMPANY_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/CompanyUsers/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_ALL_EVENTS_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Events/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_EVENT_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Events/{0}/{1}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_GAME_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Games/{0}/{1}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";

        private readonly string BASE_PATH_DB = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Locations.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_EVENTS = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Events/.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_GAMES = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Games/.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private HttpClient _httpClient = new HttpClient();

        public async Task<bool> SetUser(User user) // Insert or update
        {
            if (await checkUser(user, string.Format(BASE_PATH_USER, "")))
            {
                return false;
            }

            string uri = string.Format(BASE_PATH_USER, user.email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(user);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
            return true;
        }

        public async Task<bool> SetCompanyUser(CompanyUser user) // Insert or update
        {
            if (await checkUser(user, string.Format(BASE_PATH_COMPANY_USER, "")))
            {
                return false;
            }
            string uri = string.Format(BASE_PATH_COMPANY_USER, user.email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(user);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
            return true;
        }
        
        private async Task<bool> checkUser(User user, String path)
        {
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, path);
            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();
            Dictionary<string,User> eventsInStorage = JsonConvert.DeserializeObject<Dictionary<string, User>>(responseData);
                foreach (User e in eventsInStorage.Values)
                {
                    if (e.username == user.username || e.email == user.email)
                    {
                        return true;
                    }
                }
            
            
            return false;
        }

        public async Task SetEvent(string email, Event e) // Insert or update
        {
            if (string.IsNullOrEmpty(e.id)) {
                e.id = GenerateKey();
            }
            string uri = string.Format(BASE_PATH_EVENT_USER, email.Replace(".", " "), e.id);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(e);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task SetGame(String email, Game game)
        {
            game.id = GenerateKey();
            string uri = string.Format(BASE_PATH_GAME_USER, email.Replace(".", " "), game.id);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(game);
            httpRequestMessage.Content = new StringContent(content);
            await _httpClient.SendAsync(httpRequestMessage);
        }

        
        public async Task<List<Event>> GetAllEvents()
        {
            string uri = string.Format(BASE_PATH_EVENTS);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);

            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();

            Dictionary<string, Dictionary<string, Event>> eventsInStorage = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Event>>>(responseData);

            List<Event> all = new List<Event>();

            foreach (Dictionary<string, Event> dict in eventsInStorage.Values)
            {
                foreach (Event e in dict.Values)
                {
                    all.Add(e);
                }
            }

            return eventsInStorage is null ? new List<Event>() { } : new List<Event>(all);
        }

        public async Task<List<Event>> GetUserEvents(string email)
        {

            string uri = string.Format(BASE_PATH_ALL_EVENTS_USER, email.Replace(".", " "));

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);

            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();
            Dictionary<string, Event> eventsInStorage = JsonConvert.DeserializeObject<Dictionary<string, Event>>(responseData);
            return eventsInStorage is null ? new List<Event>(){} : new List<Event>(eventsInStorage.Values);
        }

        public async Task<User> GetUser(string email)
        {
            string uri = string.Format(BASE_PATH_USER, email.Replace(".", " "));

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);

            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();
            User userStorage = JsonConvert.DeserializeObject< User>(responseData);
            return userStorage is null ? null : userStorage;
        }

        public async Task<CompanyUser> GetCompanyUser(string email)
        {
            string uri = string.Format(BASE_PATH_COMPANY_USER, email.Replace(".", " "));

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);

            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();
            CompanyUser userStorage = JsonConvert.DeserializeObject<CompanyUser>(responseData);
            return userStorage is null ? null : userStorage;
        }

        public async Task<List<Game>> GetAllGames()
        {
            string uri = string.Format(BASE_PATH_GAMES);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);
            HttpResponseMessage response = await _httpClient.SendAsync(httpRequestMessage);
            string responseData = await response.Content.ReadAsStringAsync();

            Dictionary<string, Dictionary<string, Game>> gamesInStorage = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Game>>>(responseData);

            List<Game> all = new List<Game>();

            foreach (Dictionary<string, Game> dict in gamesInStorage.Values)
            {
                foreach (Game e in dict.Values)
                {
                    all.Add(e);
                }
            }

            return gamesInStorage is null ? new List<Game>() { } : new List<Game>(all);
        }
        
        public async Task DeleteEvent(string email, string id)
        {
            string uri = string.Format(BASE_PATH_EVENT_USER, email.Replace(".", " "), id);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task DeleteUser(string email)
        {
            string uri = string.Format(BASE_PATH_USER, email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            // if they have events or games they get deleted
            await DeleteAllUsersEvents(email);
			//TODO: DeleteAllUsersGames
			await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task DeleteCompanyUser(string email)
        {
            string uri = string.Format(BASE_PATH_COMPANY_USER, email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            // if they have events they get deleted
            await DeleteAllUsersEvents(email);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task DeleteAllUsersEvents(string email)
        {
            string uri = string.Format(BASE_PATH_ALL_EVENTS_USER, email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task DeleteAll()
        {
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, BASE_PATH_DB);

            await _httpClient.SendAsync(httpRequestMessage);
        }

		private static Random random = new Random();
        public static string GenerateKey()
        {
            var length = 10;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
