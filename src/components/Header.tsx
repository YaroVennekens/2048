import React, { FunctionComponent } from 'react';
import GameControls from '@/game/GameControls.tsx';

interface HeaderProps {
    onNewGame: () => void;
    gameOver: boolean;
    gameWon: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ onNewGame, gameOver, gameWon }) => (
  <div className="flex justify-between items-center mb-6">
      <h1 className="text-6xl font-bold text-[#776e65]">2048</h1>
      <GameControls onNewGame={onNewGame} gameOver={gameOver} gameWon={gameWon} />
  </div>
);

export default Header;