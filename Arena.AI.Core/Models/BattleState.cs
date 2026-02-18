using Arena.AI.Core.Logic;

namespace Arena.AI.Core.Models;

public class BattleState
{
    public string BattleId { get; set; }
    public Team TeamA { get; set; }
    public Team TeamB { get; set; }
    public NextUnitInfo NextUnitInfo { get; set; }
    public string? Winner => TeamA.IsAnyoneAlive ? TeamB.IsAnyoneAlive ? null : TeamA.Name : TeamB.IsAnyoneAlive ? TeamB.Name : "Noone";
}

public class NextUnitInfo
{
    public string TeamName { get; set; }
    public Unit Unit { get; set; }
    public List<string> AvailableDestinations { get; set; }
    public List<string> AvailableAttackTarget { get; set; }
}