using FireSharp;
using FireSharp.Config;
using Microsoft.AspNetCore.Mvc;
using RacoonGo.Modelo;

namespace RacoonGo.Controllers;
using FireSharp.Interfaces;
using FireSharp.Response;

public class FirebaseConnection
{
    IFirebaseClient client;
    public FirebaseConnection()
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ",
            BasePath = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/"
        };

        client = new FirebaseClient(config);
    }

    public IFirebaseClient GetClient()
    {
        return client;
    }
}