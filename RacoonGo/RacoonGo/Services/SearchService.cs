using RacoonGo.Database;
using RacoonGo.Models;

namespace RacoonGo.Services;

public class SearchService : ISearchService
{
	public HashSet<Event> SearchEvents(string query)
	{

		var keywords = query.Split(' ');
		List<Event> events = FirebaseRealtimeDatabase.Instance.GetAllEvents().Result;
		HashSet<Event> result = new();
		foreach (var e in events){
			if (keywords.Any(k => ContainsIfEmpty(e.title, k) || ContainsIfEmpty(e.description, k) ||
			                      ContainsIfEmpty(e.location.name, k) || ContainsIfEmpty(e.user.username, k) ||
			                      ContainsIfEmpty(e.user.email, k)))
			{
				result.Add(e);
			}
		}
		return result;
	}

	public HashSet<Event> SearchEvents(Event query)
	{
		var events = FirebaseRealtimeDatabase.Instance.GetAllEvents().Result;
		HashSet<Event> result = new();
		foreach (var e in events)
		{
			if (EqualIfEmpty(e.title, query.title) && EqualIfEmpty(e.description, query.description) &&
			    EqualIfEmpty(e.location.name, query.location.name) &&
			    EqualIfEmpty(e.user.username, query.user.username))
			{
				result.Add(e);
			}
		}

		return result;
	}


	// TODO: Implementar los métodos de búsqueda de juegos
	//public List<Game> SearchGames(string query){}
	//public List<Game> SearchGames(Game game){}
	

	// En caso de que el usuario no haya introducido nada en el campo de búsqueda, se devuelve true
	private static bool EqualIfEmpty(string s, string q)
	{
		if (s == "" || q == "" || s == null || q == null)
			return true;

		s = s.Trim().ToLower();
		q = q.Trim().ToLower();


		return s == q;
	}

	private static bool ContainsIfEmpty(string s, string q)
	{
		s = s.Trim().ToLower();
		q = q.Trim().ToLower();

		if (s == "" || q == "")
			return true;

		return s.Contains(q);
	}
}

public interface ISearchService
{
	HashSet<Event> SearchEvents(string query);
	HashSet<Event> SearchEvents(Event query);

	//List<Game> SearchGames(string query);
	//List<Game> SearchGames(Game query);
}