import type { GameCardData } from "@/global/components/GameCard";
import type { ApiResponse } from "@/global/types/responseApiType";

export type GetWishlistResponse = GameCardData[];

export type AddToWishlistResponse = ApiResponse;

export type RemoveFromWishlistResponse = void;