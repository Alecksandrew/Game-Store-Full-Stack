import { useCallback, useEffect } from "react";
import GameMediaGallery from "../components/GameMediaGallery";
import GamePurchasePanel from "../components/GamePurchasePanel";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useParams } from "react-router";
import { useApi } from "@/global/hooks/useApi";
import type { GameDetailsApiResponse } from "../types/GameDetailsType";
import { apiClient } from "@/global/services/apiClient";
import {
  GameDetailsDataContext,
  placeholderGameData,
} from "../contexts/GameDetailsDataContext";
import About from "../components/About";
import ColumnInfo from "../components/ColumnInfo";
import SimilarGamesSection from "../components/SimilarGamesSection";
import ReviewSection from "../components/ReviewSection";
import Header from "@/features/Home/components/Header";

export default function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();

  //This callback is being used in order to avoid fetch loops within the useApi hook and apiClient service
  const getGameDetails = useCallback(() => {
    if (!id) return Promise.reject(new Error("Game ID is missing."));
    return apiClient<GameDetailsApiResponse>(
      API_ROUTES.GAMES.GET_BY_ID + `/${id}`
    );
  }, [id]);

  // eslint-disable-next-line prefer-const
  let { data, isLoading, execute, warningComponent, warningType } = useApi<
    null,
    GameDetailsApiResponse
  >(getGameDetails);
  console.log("pagina de detalhes" + JSON.stringify(data));

  useEffect(() => {
    execute(null);
  }, [execute]);

  if (data == null) {
    data = placeholderGameData;
  }

  const gameDetailsContextValue = {
    isLoading,
    gameDetails: data,
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-primary py-15">
        <div className="w-9/10 max-w-[1100px] mx-auto">
          {warningType == "error" && warningComponent}
          <GameDetailsDataContext.Provider value={gameDetailsContextValue}>
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4">
              <GameMediaGallery className="bg-bg-primary" />
              <GamePurchasePanel />
              <About />
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
