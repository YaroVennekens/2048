import React, {FunctionComponent} from 'react'
import {cn} from '@/utils/utils.ts'

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, children }) => {
    return (
      <button
        onClick={onClick}
        className="px-6 py-3 bg-[#8f7a66] text-white font-bold rounded-md hover:opacity-90 transition-opacity"
      >
          {children}
      </button>
    );
};

interface OverlayProps {
    message: string;
    onRetry: () => void;
}

const Overlay: FunctionComponent<OverlayProps> = ({ message, onRetry }) => {
    return (
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-[rgba(238,228,218,0.73)] animate-fade-in",
        "z-10 rounded-md"
      )}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-scale-in">
              <h2 className="text-2xl font-bold mb-4">{message}</h2>
              <Button onClick={onRetry}>Try again</Button>
          </div>
      </div>
    );
};

interface GameControlsProps {
    onNewGame: () => void;
    gameOver: boolean;
    gameWon: boolean;
}

const GameControls: FunctionComponent<GameControlsProps> = ({ onNewGame, gameOver, gameWon }) => {
    return (
      <div className="flex flex-col w-full items-center mb-6 relative">
          <Button onClick={onNewGame}>New Game</Button>
          {(gameOver || gameWon) && (
            <Overlay message={gameWon ? "You win!" : "Game over!"} onRetry={onNewGame} />
          )}
      </div>
    );
};

export default GameControls;
