import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import { GameCardNoPrice } from "@/features/Home/components/GameCard/GameCardPresets";

export default function SimilarGamesSection() {
  const data = useContext(GameDetailsDataContext);

  function listSimilarGames() {
    return data.similarGames.slice(0, 3).map((similarGame) => {
      return <GameCardNoPrice gameData={similarGame} />;
    });
  }

  return (
    <div>
      <h2 className="text-text-primary text-3xl">Similar games</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 w-full mt-3">
        {listSimilarGames()}
      </div>
    </div>
  );
}
