using System.Collections.Concurrent;
using backend.Models;

namespace backend.Repositories;

public class PeopleRepository
{
    private readonly ConcurrentDictionary<int, Person> _people = new(new Dictionary<int, Person>
    {
        [1] = new(1, "demo", "Alice Johnson", "alice@example.com", "555-0101", new DateOnly(1990, 5, 14)),
        [2] = new(2, "demo", "Bob Smith",     "bob@example.com",   "555-0102", new DateOnly(1985, 11, 3)),
    });
    private int _currentId = 2;

    public IEnumerable<Person> GetAll(string sessionId) => 
        _people.Values.Where(p => p.SessionId == sessionId);

    public Person? GetById(int id, string sessionId)
    {
        if (_people.TryGetValue(id, out var person) && person.SessionId == sessionId)
            return person;
        return null;
    }

    public Person Create(Person person)
    {
        var id = Interlocked.Increment(ref _currentId);
        var created = person with { Id = id };
        _people[id] = created;

        return created;
    }

    public Person? Update(int id, Person person, string sessionId)
    {
        if (!_people.TryGetValue(id, out var existing) || existing.SessionId != sessionId)
            return null;

        var updated = person with { Id = id, SessionId = sessionId };
        _people[id] = updated;

        return updated;
    }

    public bool Delete(int id, string sessionId)
    {
        if (_people.TryGetValue(id, out var person) && person.SessionId == sessionId)
            return _people.TryRemove(id, out _);
        return false;
    }
}
