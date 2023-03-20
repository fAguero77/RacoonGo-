using FireSharp;
using FireSharp.Interfaces;
using FireSharp.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RacoonGo.Controllers;
using RacoonGo.Modelo;
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

    }
    }