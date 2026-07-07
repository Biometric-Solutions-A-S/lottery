using backend.Endpoints;
using backend.Repositories;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PeopleRepository>();
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5090").AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseCors();
app.MapPeopleEndpoints();

app.Lifetime.ApplicationStarted.Register(() =>
{
    var server = app.Services.GetRequiredService<IServer>();
    var addresses = server.Features.Get<IServerAddressesFeature>();
    var listeningOn = addresses?.Addresses.Any() == true
        ? string.Join(", ", addresses.Addresses)
        : "ukendt adresse";

    Console.WriteLine($"---");
    Console.WriteLine($"Server ready, listening on: {listeningOn}");
    Console.WriteLine($"---");
});

app.Run();
