type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | null;

interface TileProps {
  value: TileValue;
  position: [number, number];
  mergedFrom?: [number, number][];
  isNew?: boolean;
}
