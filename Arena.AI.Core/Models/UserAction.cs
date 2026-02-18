namespace Arena.AI.Core.Models;

public class UserAction
{
    public UserActionType ActionType => Destination is null ? Target is null ? UserActionType.Skip : UserActionType.Attack : UserActionType.Move;
    public string? Destination { get; set; }
    public string? Target { get; set; }
}
