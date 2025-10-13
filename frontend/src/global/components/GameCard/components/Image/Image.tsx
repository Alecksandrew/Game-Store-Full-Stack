import { useContext } from "react";
import { GameCardContext } from "../../context/GameCardContext";



export default function GameCardImage() {
  const gameData = useContext(GameCardContext);
  if (!gameData) {
    throw new Error('Erro: This component need to be used inside a GameCard.Root');
  }

  return (
    <div className="w-full aspect-[3/4] bg-text-secondary">
      <img
        src={gameData.coverUrl}
        alt={`Image of the game ${gameData.name}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
