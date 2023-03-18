using FireSharp;
using FireSharp.Config;
using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;

namespace RacoonGo.Controllers;
using FireSharp.Interfaces;
using FireSharp.Response;

public class FirebaseConnection
{
    IFirebaseClient cliente;
    public FirebaseConnection()
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ",
            BasePath = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/"
        };
        
        cliente=new FirebaseClient(config);
    }
    
    [HttpPost]
    public ActionResult Crear(User user)
    {
        SetResponse setResponse = cliente.Set("User/" + user.getUsername(), user);
        if (setResponse.StatusCode == System.Net.HttpStatusCode.OK)
        {
            return null;
        }
        else
        {
            return null;
        }
    }
    
}