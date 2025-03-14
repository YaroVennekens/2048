export type TileType = {
  position: [number, number];
  value: number;
  id: number;
  mergedFrom?: TileType[];
  isNew?: boolean;
};