

import { GameState } from "./GameState";
export const initialGameState: GameState = {
  grid: Array(4).fill(null).map(() => Array(4).fill(null)),
  tiles: [],
  score: 0,
  won: false,
  over: false,
};