import React, {FunctionComponent} from 'react'
import Tile from '@/game/Tile.tsx'
import {TileType} from '@/interface/TileType.ts'

interface GameGridProps {
  tiles: TileType[];
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
}

const GameGrid: FunctionComponent<GameGridProps> = ({ tiles, handleTouchStart, handleTouchEnd }) => (
  <div className="relative bg-[#bbada0] p-4 rounded-md touch-none"
       onTouchStart={handleTouchStart}
       onTouchEnd={handleTouchEnd}
  >

    <div className="grid grid-cols-4 gap-4">
      {Array(16).fill(null).map((_, index) => (
        <div key={index} className="w-full pt-[100%] relative bg-[#cdc1b4] rounded-md" />
      ))}
    </div>


    <div className="absolute inset-4">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          value={tile.value as number}
          position={[tile.position[1], tile.position[0]]}
          isNew={tile.isNew}
          mergedFrom={tile.mergedFrom?.map(t => t.position)}
        />
      ))}
    </div>
  </div>
);

export default GameGrid;