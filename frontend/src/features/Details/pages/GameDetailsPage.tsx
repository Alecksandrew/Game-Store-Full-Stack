import { useEffect } from "react";
import GameMediaGallery from "../components/GameMediaGallery";
import GamePurchasePanel from "../components/GamePurchasePanel";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useParams } from "react-router";
import { useApi } from "@/global/hooks/useApi";
import type { GameDetailsApiResponse } from "../types/GameDetailsType";
import { apiClient } from "@/global/services/apiClient";

export default function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line prefer-const
  let { data, isLoading, execute, warningComponent, warningType } = useApi<
    null,
    GameDetailsApiResponse
  >(() => apiClient(API_ROUTES.GAMES.GET_BY_ID + `/${id}`));

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
    if (id == null) return;
    execute(null);
  }, [execute, id]);

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
