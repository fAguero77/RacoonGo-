using FireSharp.Interfaces;
using FireSharp.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using FireSharp.Config;


using RacoonGo.Modelo;
using Newtonsoft.Json.Linq;

namespace RacoonGo.Controllers
{
    public class CRUDFirebase
    {

        FirebaseConnection firebaseConnection = new FirebaseConnection();
        IFirebaseClient client;
        public CRUDFirebase()
        {
            client = firebaseConnection.GetClient();
        }

        public async Task<bool> addUser(User user)
        {
            FirebaseResponse response1 = await client.GetAsync("Usuarios/");
            string json = response1.Body;
            Dictionary<string, User> users = JsonConvert.DeserializeObject<Dictionary<string, User>>(json);
            var usersArray = users.Values.ToArray();
            foreach (var user2 in usersArray)
            {
                if (user.username == user2.username)
                {
                    return false;
                }
            }
            
            PushResponse response = await client.PushAsync("Usuarios/", user);
            User result = response.ResultAs<User>();
            return true;
        }
        
        public async Task<IActionResult> addCompany(CompanyUser company)
        {
            PushResponse response = await client.PushAsync("Usuarios/", company);
            CompanyUser result = response.ResultAs<CompanyUser>();
            return new JsonResult(result);
        }

        public async Task<IActionResult> addEvent(Event evento){
            PushResponse response = await client.PushAsync("Eventos/",evento);
            Event result = response.ResultAs<Event>();
            return new JsonResult(result);
        }

        public async Task<Event[]> getEvents()
        {
            FirebaseResponse response = await client.GetAsync("Eventos/");
            var data = JsonConvert.DeserializeObject<Dictionary<string, Event>>(response.Body);
            var eventArray = data.Values.ToArray();
            //Cogemos la id
            var keys = data.Keys.ToArray();
            for (int i = 0; i < eventArray.Length; i++)
            {
                eventArray[i].id = keys[i];
            }
            return eventArray;
        }

        public async Task<Event[]> getMyEvents(String username)
        {
            Event[] events = getEvents().Result;
            List<Event> result = new List<Event>();
            foreach (var e in events){
                if( e.user.username.Equals(username)) {
                    result.Add(e);
                }

            }
            return result.ToArray();
        }

        public async Task<User[]> getUser(String email)
        {
            FirebaseResponse response = await client.GetAsync("Usuarios/");
            string json = response.Body;
            Dictionary<string, User> user = JsonConvert.DeserializeObject<Dictionary<string, User>>(json);
            var users = user.Values.Where(user => user.email == email);

            return users.ToArray();
        }

        public async Task<IActionResult> deleteEvent(String id)
        {
            FirebaseResponse response = await client.DeleteAsync("Eventos/"+id);
            return new JsonResult(id);
         }


    }
    }