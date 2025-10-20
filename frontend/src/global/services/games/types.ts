// src/global/services/game/types.ts

import type { GameCardData } from "@/global/components/GameCard";
import type { GameDetailsApiResponse } from "@/features/Details/types/GameDetailsType";


export type GetGamesRequest = {
  currentPage: number;
  pageSize?: number;
  searchTerm?: string;
  genre?: string;
  rating?: string;
  yearFrom?: string;
};

export type GetGamesResponse = GameCardData[];



export type GetGameDetailsResponse = GameDetailsApiResponse;

