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

const Tile: FunctionComponent<TileProps> = ({ value, position, isNew = false, mergedFrom }) => {
  if (!value) return null;

  const positionStyle: React.CSSProperties = {
    transform: `translate(calc(${position[0]} * (100% + 16px)), calc(${position[1]} * (100% + 16px)))`,
    position: "absolute" as const,
    width: "calc(25% - 12px)",
    height: "calc(25% - 12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    userSelect: "none",
    backgroundColor: getBgColor(value),
    color: getTextColor(value),
    fontSize: getFontSize(value),
    fontWeight: "bold",
    transition: "transform 150ms",
    animation: isNew ? "scaleIn 0.2s ease-in-out" :
      mergedFrom ? "merge 0.2s ease-in-out" : "none"
  };

  return (
    <div style={positionStyle}>
      {value}
    </div>
  );
};

export default Tile;

