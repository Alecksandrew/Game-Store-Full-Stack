import { createContext } from "react";
import { type GameDetailsApiResponse } from "../types/GameDetailsType";

export const placeholderGameData = {
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

export const GameDetailsDataContext =
  createContext<GameDetailsApiResponse>(placeholderGameData);
