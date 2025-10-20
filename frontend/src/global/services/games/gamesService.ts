// src/global/services/game/gameService.ts

import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type {
  GetGamesRequest,
  GetGamesResponse,
  GetGameDetailsResponse,
} from "./types";
import { apiClient } from "../apiClient";

export const gameService = {
  async getGames(request: GetGamesRequest): Promise<GetGamesResponse> {
    const params = new URLSearchParams({
      page: String(request.currentPage),
      pageSize: String(request.pageSize || 12),
    });

    if (request.genre) {
      params.append("genre", request.genre);
    }
    if (request.searchTerm) {
      params.append("search", request.searchTerm);
    }
    if (request.rating) {
      params.append("rating", request.rating);
    }
    if (request.yearFrom) {
      params.append("yearFrom", request.yearFrom);
    }

    const url = `${API_ROUTES.GAMES.GET}?${params.toString()}`;

    return apiClient<GetGamesResponse>(url, { method: "GET" });
  },

  async getGameDetails(gameId: string): Promise<GetGameDetailsResponse> {
    const url = `${API_ROUTES.GAMES.GET_BY_ID}/${gameId}`;
    return apiClient<GetGameDetailsResponse>(url, { method: "GET" });
  },
};
