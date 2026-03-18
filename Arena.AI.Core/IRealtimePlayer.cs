using Arena.AI.Core.Models;

namespace Arena.AI.Core;

public interface IRealtimePlayer
{
    Task<UserAction> ActAsync(BattleState battleState);
}
