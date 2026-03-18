namespace Arena.AI.Core.Models;

public class UserAction
{
    public UserActionType ActionType => Destination is null ? Target is null ? UserActionType.Skip : UserActionType.Attack : UserActionType.Move;
    public string? Destination { get; set; }
    public string? Target { get; set; }

    public static UserAction Skip() => new() { Destination = null, Target = null };
    public static UserAction Move(string destination) => new() { Destination = destination, Target = null };
    public static UserAction Attack(string target) => new() { Destination = null, Target = target };
}
