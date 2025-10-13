import { useContext } from "react";
import { GameCardContext } from "../../context/GameCardContext";

export function Title() {
  const gameData = useContext(GameCardContext);

  return (
    <h2 className="text-white text-3xl mb-auto line-clamp-2">
      {gameData.name}
    </h2>
  );
}
