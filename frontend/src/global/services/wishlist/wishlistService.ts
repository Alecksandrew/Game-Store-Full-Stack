import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import type { 
    GetWishlistResponse, 
    AddToWishlistResponse, 
    RemoveFromWishlistResponse 
} from './types';
import { apiClient } from '../apiClient';

export const wishlistService = {

  async getWishlist(): Promise<GetWishlistResponse> {
    return apiClient<GetWishlistResponse>(API_ROUTES.WISHLIST.GET, { method: 'GET' }, true);
  },

 
  async addToWishlist(gameId: number): Promise<AddToWishlistResponse> {
    return apiClient<AddToWishlistResponse>(
      API_ROUTES.WISHLIST.ADD_FUNCTION(gameId),
      { method: 'POST' },
      true
    );
  },

 
  async removeFromWishlist(gameId: number): Promise<RemoveFromWishlistResponse> {
    return apiClient<RemoveFromWishlistResponse>(
      API_ROUTES.WISHLIST.REMOVE_FUNCTION(gameId),
      { method: 'DELETE' },
      true
    );
  },
};