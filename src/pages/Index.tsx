import GameBoard from '@/game/Gameboard';
import React from 'react';


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8ef] p-4">
      <div className="w-full max-w-md">
        <GameBoard />
      </div>
    </div>
  );
};

export default Index;
