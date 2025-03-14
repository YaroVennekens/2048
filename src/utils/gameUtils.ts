
import {Direction} from '@/interface/Direction.ts'
import { TileType } from '@/interface/TileType';

let tileIdCounter = 0;

export const getRandomPosition = () => {
  return Math.floor(Math.random() * 4);
};

export const getRandomValue = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

export const getNextTileId = () => {
  return tileIdCounter++;
};

export const hasAvailableCells = (grid: (TileType | null)[][]) => {
  return grid.some(row => row.some(cell => cell === null));
};

export const hasAvailableMoves = (grid: (TileType | null)[][]) => {
  if (hasAvailableCells(grid)) return true;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const tile = grid[i][j];
      if (tile) {
        const neighbors = [
          i > 0 ? grid[i - 1][j] : null,
          i < 3 ? grid[i + 1][j] : null,
          j > 0 ? grid[i][j - 1] : null,
          j < 3 ? grid[i][j + 1] : null,
        ];

        if (neighbors.some(n => n && n.value === tile.value)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const findFarthestPosition = (
  grid: (TileType | null)[][],
  pos: [number, number],
  direction: [number, number]
): { farthest: [number, number]; next: [number, number] | null } => {
  let prev = pos;
  let current = [pos[0] + direction[0], pos[1] + direction[1]] as [number, number];

  while (
    current[0] >= 0 &&
    current[0] < 4 &&
    current[1] >= 0 &&
    current[1] < 4 &&
    grid[current[0]][current[1]] === null
    ) {
    prev = current;
    current = [current[0] + direction[0], current[1] + direction[1]] as [number, number];
  }

  if (
    current[0] >= 0 &&
    current[0] < 4 &&
    current[1] >= 0 &&
    current[1] < 4 &&
    grid[current[0]][current[1]] !== null
  ) {
    return { farthest: prev, next: current };
  }

  return { farthest: prev, next: null };
};

export const getVector = (direction: Direction): [number, number] => {
  switch (direction) {
    case "up":
      return [-1, 0];
    case "right":
      return [0, 1];
    case "down":
      return [1, 0];
    case "left":
      return [0, -1];
  }
};

export const getTraversals = (direction: Direction): { x: number[]; y: number[] } => {
  const traversals = {
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
  };

  if (direction === "right") traversals.y = [3, 2, 1, 0];
  if (direction === "down") traversals.x = [3, 2, 1, 0];

  return traversals;
};