import {TileType} from '@/interface/TileType.ts'

export interface GameState {
  grid: (TileType | null)[][];
  tiles: TileType[];
  score: number;
  won: boolean;
  over: boolean;
}
