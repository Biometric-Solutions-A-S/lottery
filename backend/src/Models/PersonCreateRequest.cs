using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public record PersonCreateRequest(
    [property: Required, StringLength(100, MinimumLength = 1)]
    string Name,
    [property: Required, StringLength(200)]
    string Email,
    [property: StringLength(30)]
    string? Phone = null,
    DateOnly? Birthday = null);
