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

        public async Task<IActionResult> addUser(User user)
        {
            PushResponse response = await client.PushAsync("Usuarios/", user);
            User result = response.ResultAs<User>();
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
            return eventArray;
        }

        public async Task<Event[]> getMyEvents(String username)
        {
            FirebaseResponse response = await client.GetAsync("Eventos/");
            string json = response.Body;
            Dictionary<string, Event> myEvents = JsonConvert.DeserializeObject<Dictionary<string, Event>>(json);
            var events = myEvents.Values.Where(evento => evento.user.username == username);

            return events.ToArray();
        }

        public async Task<User[]> getUser(String email)
        {
            FirebaseResponse response = await client.GetAsync("Usuarios/");
            string json = response.Body;
            Dictionary<string, User> user = JsonConvert.DeserializeObject<Dictionary<string, User>>(json);
            var users = user.Values.Where(user => user.email == email);

            return users.ToArray();
        }

    }
    }