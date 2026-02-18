namespace Arena.AI.Core.Models;

public interface IPlayer
{
    Task<UserAction[]> Play(BattleState battleState);
}
