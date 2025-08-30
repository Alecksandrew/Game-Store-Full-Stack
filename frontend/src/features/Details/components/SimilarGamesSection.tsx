import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import {GameCardNoPrice} from "@/features/Home/components/GameCard/GameCardPresets";

export default function SimilarGamesSection() {
  const data = useContext(GameDetailsDataContext);

  function listSimilarGames() {
    return data.similarGames.slice(0, 4).map((similarGame) => {
      return (
        <GameCardNoPrice
          gameData={similarGame}
          className="min-h-[400px] text-2xl"
        />
      );
    });
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 w-full">
      {listSimilarGames()}
    </div>
  );
}
