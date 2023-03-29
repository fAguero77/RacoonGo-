﻿using RacoonGo.Modelo;
using Newtonsoft.Json;
using System;

namespace RacoonGo.Database
{
    public class FirebaseRealtimeDatabase
    {
        // DB -> Users/id_mail_user -> User
        // DB -> CompanyUsers/id_mail_user -> CompanyUser
        // DB -> Events/id_mail_user -> All users events
        // DB -> Events/id_mial_user/id_event -> Event

        private static readonly FirebaseRealtimeDatabase i = new FirebaseRealtimeDatabase();
        static FirebaseRealtimeDatabase() { } // Make sure it's truly lazy
        private FirebaseRealtimeDatabase() { } // Prevent instantiation outside

        public static FirebaseRealtimeDatabase Instance { get { return i; } }

        private readonly string BASE_PATH_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Users/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_COMPANY_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/CompanyUsers/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_ALL_EVENTS_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Events/{0}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_EVENT_USER = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Events/{0}/{1}.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private readonly string BASE_PATH_DB = "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app/Locations.json?auth=hdYoKtTxDhfxoKF34JXlwXVSsclVI9c8uHu8vebZ";
        private HttpClient _httpClient = new HttpClient();

        public async Task SetUser(User user) // Insert or update
        {
            string uri = string.Format(BASE_PATH_USER, user.email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(user);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task SetCompanyUser(CompanyUser user) // Insert or update
        {
            string uri = string.Format(BASE_PATH_COMPANY_USER, user.email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(user);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task SetEvent(string email, Event e) // Insert or update
        {
            e.Id = GenerateKey();
            string uri = string.Format(BASE_PATH_EVENT_USER, email.Replace(".", " "), e.Id);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            string content = JsonConvert.SerializeObject(e);
            httpRequestMessage.Content = new StringContent(content);

            await _httpClient.SendAsync(httpRequestMessage);
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

        public async Task DeleteEvent(string email, Event e)
        {
            string uri = string.Format(BASE_PATH_EVENT_USER, email.Replace(".", " "), e.Id);
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            await _httpClient.SendAsync(httpRequestMessage);
        }

        public async Task DeletelUser(string email)
        {
            string uri = string.Format(BASE_PATH_USER, email.Replace(".", " "));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, uri);

            // if they have events they get deleted
            await DeleteAllUsersEvents(email);
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