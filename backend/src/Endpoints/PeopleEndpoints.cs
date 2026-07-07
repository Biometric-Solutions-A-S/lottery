using backend.Filters;
using backend.Models;
using backend.Repositories;

namespace backend.Endpoints;

public static class PeopleEndpoints
{
    public static void MapPeopleEndpoints(this WebApplication app)
    {
        app.MapGet("/people", (string sessionId, PeopleRepository repo) =>
            Results.Ok(repo.GetAll(sessionId)));

        app.MapGet("/people/{id:int}", (int id, string sessionId, PeopleRepository repo) =>
            repo.GetById(id, sessionId) is { } person
                ? Results.Ok(person)
                : Results.NotFound());

        app.MapPost("/people", (string sessionId, Person person, PeopleRepository repo) =>
        {
            var created = repo.Create(person with { SessionId = sessionId });
            return Results.Created($"/people/{created.Id}", created);
        }).AddEndpointFilter<ValidationFilter<Person>>();

        app.MapPut("/people/{id:int}", (int id, string sessionId, Person updated, PeopleRepository repo) =>
            repo.Update(id, updated, sessionId) is { } person
                ? Results.Ok(person)
                : Results.NotFound())
          .AddEndpointFilter<ValidationFilter<Person>>();

        app.MapDelete("/people/{id:int}", (int id, string sessionId, PeopleRepository repo) =>
            repo.Delete(id, sessionId)
                ? Results.NoContent()
                : Results.NotFound());
    }
}
