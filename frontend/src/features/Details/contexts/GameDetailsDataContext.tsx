import { createContext } from "react";
import { type GameDetailsApiResponse } from "../types/GameDetailsType";

export const placeholderGameData = {
  id: 0,
  name: "Game not found",
  summary:
    "No data was returned for this game. Please check your connection or try again later.",
  genres: [],
  firstReleaseDate: null,
  coverUrl: "https://placehold.co/600x400?text=No+Image",
  screenshotsImageUrl: [
    "https://placehold.co/600x400?text=No+Screenshot+1",
    "https://placehold.co/600x400?text=No+Screenshot+2",
    "https://placehold.co/600x400?text=No+Screenshot+3",
  ],
  platforms: [],
  videos: [],
  involvedCompanies: {
    developers: [],
    publishers: [],
  },
  gameModes: [],
  price: 0,
  discountPrice: 0,
  totalSells: 0,
  availableKeysStock: 0,
  similarGames: [
    {
      id: 0,
      name: "",
      coverUrl: "",
    },
    
  ],
};

export const GameDetailsDataContext =
  createContext<GameDetailsApiResponse>(placeholderGameData);
