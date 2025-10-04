import { createContext } from "react";
import { type GameDetailsApiResponse } from "../types/GameDetailsType";


export const placeholderGameData: GameDetailsApiResponse = {
  id: 0,
  name: "Loading...",
  summary: "Loading game details...",
  genres: [],
  firstReleaseDate: null,
  coverUrl: "",
  screenshotsImageUrl: [],
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
  similarGames: [],
};

export type GameDetailsContextType = {
  isLoading: boolean;
  gameDetails: GameDetailsApiResponse;
};


const initialContextValue: GameDetailsContextType = {
  isLoading: false,
  gameDetails: placeholderGameData,
};

export const GameDetailsDataContext =
  createContext<GameDetailsContextType>(initialContextValue);