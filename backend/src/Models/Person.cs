using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public record Person(
    int Id,
    [property: Required, StringLength(100, MinimumLength = 1)]
    string SessionId,
    [property: Required, StringLength(100, MinimumLength = 1)]
    string Name,
    [property: Required, StringLength(200)]
    string Email,
    [property: StringLength(30)]
    string? Phone = null,
    DateOnly? Birthday = null);
