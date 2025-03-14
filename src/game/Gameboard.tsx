import React, {FunctionComponent, useEffect, useState} from 'react'


import Score from "./Score";
import {use2048Game} from '@/game/game.ts'
import Header from '@/components/Header.tsx'
import GameGrid from '@/components/GameGrid.tsx'


const GameBoard: FunctionComponent = () => {
    const {
        tiles,
        score,
        won,
        over,
        initializeGame,
        handleTouchStart,
        handleTouchEnd
    } = use2048Game();

    const [bestScore, setBestScore] = useState<number>(() => {
        const saved = localStorage.getItem("2048-best-score");
        return saved ? parseInt(saved, 10) : 0;
    });

    // Update best score
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem("2048-best-score", score.toString());
        }
    }, [score, bestScore]);

    return (
      <div className="w-full max-w-md mx-auto">
          <Header onNewGame={initializeGame} gameOver={over} gameWon={won} />
          <Score score={score} best={bestScore} />
          <GameGrid tiles={tiles} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} />

      </div>
    );
};

export default GameBoard;