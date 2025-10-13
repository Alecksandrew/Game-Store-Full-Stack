import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import {
  GameCardNoPrice,
  GameCardSkeleton,
} from "@/global/components/GameCard/GameCardPresets";

export default function SimilarGamesSection() {
  const { isLoading, gameDetails } = useContext(GameDetailsDataContext);

  
  function renderContent() {
   
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <GameCardSkeleton key={index} />
      ));
    }

    if (!gameDetails?.similarGames || gameDetails.similarGames.length === 0) {
      return <p className="text-text-primary col-span-full">No similar games found.</p>;
    }

    return gameDetails.similarGames.slice(0, 3).map((similarGame) => (
      <GameCardNoPrice key={similarGame.id} gameData={similarGame} />
    ));
  }

  return (
    <div>
      <h2 className="text-text-primary text-3xl">Similar games</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 w-full mt-3">
        {renderContent()}
      </div>
    </div>
  );
}

