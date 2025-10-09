import GameMediaGallery from "../components/GameMediaGallery";
import GamePurchasePanel from "../components/GamePurchasePanel";
import {
  GameDetailsDataContext,
} from "../contexts/GameDetailsDataContext";
import ColumnInfo from "../components/ColumnInfo";
import SimilarGamesSection from "../components/SimilarGamesSection";
import ReviewSection from "../components/ReviewSection";
import Header from "@/features/Home/components/Header";
import { useGameDetails } from "../hooks/useGameDetails";
import ExpandableText from "@/global/components/ExpandableText";

export default function GameDetailsPage() {
   const { gameDetails, isLoading, warningType, warningComponent } = useGameDetails();

  const gameDetailsContextValue = {
    isLoading,
    gameDetails: gameDetails,
  }

  return (
    <>
      <div className="min-h-screen bg-bg-primary py-15">
        <div className="w-9/10 max-w-[1100px] mx-auto">
          {warningType == "error" && warningComponent}
          <GameDetailsDataContext.Provider value={gameDetailsContextValue}>
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4">
              <GameMediaGallery className="bg-bg-primary" />
              <GamePurchasePanel />
              <ExpandableText title="About" text={gameDetails.summary}/>
              <ColumnInfo />
              <SimilarGamesSection />
              <ReviewSection className="lg:col-span-2 mt-10" />
            </div>
          </GameDetailsDataContext.Provider>
        </div>
      </div>
    </>
  );
}
