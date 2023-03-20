using FireSharp.Interfaces;
using FireSharp.Response;
using Microsoft.AspNetCore.Mvc;
using RacoonGo.Controllers;
using RacoonGo.Modelo;

public class CRUDFirebase
{
   
    FirebaseConnection firebaseConnection = new FirebaseConnection();
    IFirebaseClient client;
    public CRUDFirebase()
    {
        client = firebaseConnection.GetClient();
    }

    public async Task<IActionResult> Index(User user)
    {
        PushResponse response = await client.PushAsync("Usuarios/", user);
        User result = response.ResultAs<User>();
        return new JsonResult(result);
    }



}