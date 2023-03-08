using FireSharp;
using FireSharp.Config;

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
    
}