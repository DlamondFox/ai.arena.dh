import api from "./axios";

/**
 * @typedef {Object} BattleAction
 * @property {string} unitName
 * @property {number} unitType
 * @property {number} actionType
 * @property {string} target
 * @property {number} amount
 * @property {string} destination
 */

/**
 * @typedef {Object} CalculateRandomTeamRequest
 * @property {string} battleId
 * @property {string} winner
 * @property {BattleAction[]} actions
 */

/**
 * POST /BattleCalculator/calculate-random-team
 * @param {CalculateRandomTeamRequest} body
 */
export const calculateRandomTeam = async (body) => {
  const res = await api.post("/BattleCalculator/calculate-random-team", body);
  return res.data;
};
