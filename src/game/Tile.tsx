import React, {FunctionComponent} from 'react'

type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | null;

interface TileProps {
  value: TileValue;
  position: [number, number];
  mergedFrom?: [number, number][];
  isNew?: boolean;
}

const getBgColor = (value: TileValue): string => {
  if (!value) return "transparent";

  const colorMap: Record<number, string> = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };

  return colorMap[value] || "#cdc1b4";
};

const getTextColor = (value: TileValue): string => {
  if (!value || value <= 4) return "#776e65";
  return "#ffffff";
};

const getFontSize = (value: TileValue): string => {
  if (!value) return "2.25rem";

  if (value < 100) return "2.25rem";
  if (value < 1000) return "1.875rem";
  return "1.5rem";
};
