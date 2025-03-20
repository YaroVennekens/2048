
import { useState, useEffect, useCallback } from "react";

import { getRandomValue, getNextTileId, hasAvailableCells, hasAvailableMoves, findFarthestPosition, getVector, getTraversals } from '../utils/gameUtils.ts';
import { GameState } from "@/interface/GameState";
import { initialGameState } from "@/interface/typs";
import { TileType } from "@/interface/TileType";
import {Direction} from '@/interface/Direction.ts'

export function use2048Game() {

  const [gameState, setGameState] = useState<GameState>({ ...initialGameState });
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  const addRandomTile = useCallback((currentState: GameState) => {
    if (!hasAvailableCells(currentState.grid)) return currentState;

    const availablePositions: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!currentState.grid[i][j]) {
          availablePositions.push([i, j]);
        }
      }
    }

    const pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const value = getRandomValue();

    const newTile: TileType = {
      position: pos,
      value,
      id: getNextTileId(),
      isNew: true,
    };

    const newGrid = [...currentState.grid];
    newGrid[pos[0]][pos[1]] = newTile;

    return {
      ...currentState,
      grid: newGrid,
      tiles: [...currentState.tiles, newTile],
    };
  }, []);

  const initializeGame = useCallback(() => {
    const newGame = { ...initialGameState };
    const tileIdCounter = 0;

    const gameWithOneTile = addRandomTile(newGame);
    const gameWithTwoTiles = addRandomTile(gameWithOneTile);

    setGameState(gameWithTwoTiles);
  }, [addRandomTile]);

  const moveTiles = useCallback((direction: Direction) => {
    if (gameState.over || gameState.won) return;

    const vector = getVector(direction);
    const traversals = getTraversals(direction);

    let moved = false;
    let newScore = gameState.score;
    const newGrid = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null));
    let newTiles: TileType[] = [];

    const mergedPositions: Set<string> = new Set();

    traversals.x.forEach(x => {
      traversals.y.forEach(y => {
        const cell = gameState.grid[x][y];
        if (cell) {
          const { farthest, next } = findFarthestPosition(
            newGrid,
            [x, y],
            vector
          );

          if (
            next &&
            newGrid[next[0]][next[1]] &&
            newGrid[next[0]][next[1]]!.value === cell.value &&
            !mergedPositions.has(`${next[0]},${next[1]}`)
          ) {
            const merged: TileType = {
              position: next,
              value: cell.value * 2,
              id: getNextTileId(),
              mergedFrom: [cell, newGrid[next[0]][next[1]]!],
            };

            mergedPositions.add(`${next[0]},${next[1]}`);

            newScore += merged.value;

            newGrid[next[0]][next[1]] = merged;
            newTiles.push(merged);

            moved = true;
          } else {
            const movedTile: TileType = {
              ...cell,
              position: farthest,
              mergedFrom: undefined,
              isNew: false,
            };

            newGrid[farthest[0]][farthest[1]] = movedTile;
            newTiles.push(movedTile);

            if (farthest[0] !== x || farthest[1] !== y) {
              moved = true;
            }
          }
        }
      });
    });

    if (moved) {
      const newGameState = {
        grid: newGrid,
        tiles: newTiles,
        score: newScore,
        won: newTiles.some(tile => tile.value >= 2048),
        over: false,
      };

      const finalGameState = addRandomTile(newGameState);

      finalGameState.over = !hasAvailableMoves(finalGameState.grid);

      setGameState(finalGameState);
    }
  }, [gameState, addRandomTile]);

  useEffect(() => {
    const moveSound = new Audio("/move.wav");
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "w", "d", "s", "a"].includes(event.key)) {
        event.preventDefault();

        let direction: Direction;
        switch (event.key) {
          case "ArrowUp":
          case "w":
            direction = "up";
            break;
          case "ArrowRight":
          case "d":
            direction = "right";
            break;
          case "ArrowDown":
          case "s":
            direction = "down";
            break;
          case "ArrowLeft":
          case "a":
            direction = "left";
            break;
          default:
            return;
        }
        moveSound.currentTime = 0;
        moveSound.play().catch(err => console.warn("Audio playback failed", err));
        moveTiles(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveTiles]);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState.over || gameState.won) return;
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (gameState.over || gameState.won || startX === null || startY === null) return;

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const dx = endX - startX;
    const dy = endY - startY;

    setStartX(null);
    setStartY(null);

    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      moveTiles(dx > 0 ? "right" : "left");
    } else {
      moveTiles(dy > 0 ? "down" : "up");
    }
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    grid: gameState.grid,
    tiles: gameState.tiles,
    score: gameState.score,
    won: gameState.won,
    over: gameState.over,
    initializeGame,
    handleTouchStart,
    handleTouchEnd,
  };
}