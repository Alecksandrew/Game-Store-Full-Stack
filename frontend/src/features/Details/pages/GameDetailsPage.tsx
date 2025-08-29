import { useCallback, useEffect } from "react";
import GameMediaGallery from "../components/GameMediaGallery";
import GamePurchasePanel from "../components/GamePurchasePanel";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useParams } from "react-router";
import { useApi } from "@/global/hooks/useApi";
import type { GameDetailsApiResponse } from "../types/GameDetailsType";
import { apiClient } from "@/global/services/apiClient";

export default function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();

  //This callback is being used in order to avoid fetch loops within the useApi hook and apiClient service
  const getGameDetails = useCallback(() => {
    if (!id) return Promise.reject(new Error("Game ID is missing."));
    return apiClient<GameDetailsApiResponse>(API_ROUTES.GAMES.GET_BY_ID + `/${id}`);
  }, [id]);

  // eslint-disable-next-line prefer-const
  let { data, isLoading, execute, warningComponent, warningType } = useApi<
    null,
    GameDetailsApiResponse
  >(getGameDetails);

  const placeholderGameData = {
    id: 0,
    name: "Game not found",
    summary:
      "No data was returned for this game. Please check your connection or try again later.",
    genres: null,
    firstReleaseDate: null,
    coverUrl: "https://placehold.co/600x400",
    screenshotsImageUrl: ["https://placehold.co/600x400"],
    platforms: [],
    videos: [],
    price: 0,
    discountPrice: 0,
    totalSells: 0,
    availableKeysStock: 0,
  };

  useEffect(() => {
    execute(null);
  }, [execute]);

  if (data == null) {
    data = placeholderGameData
  }
  
  return (
    <>
      {warningType == "error" && warningComponent}
      <GameMediaGallery screenshotUrls={data?.screenshotsImageUrl} />
      <GamePurchasePanel gameData={data} />
    </>
  );
}
