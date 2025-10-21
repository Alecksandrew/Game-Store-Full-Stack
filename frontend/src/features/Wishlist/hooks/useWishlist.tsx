import { useRequestHandler } from "@/global/hooks/useRequestHandler";

import type {
  AddToWishlistResponse,
  GetWishlistResponse,
  RemoveFromWishlistResponse,
} from "@/global/services/wishlist/types";
import { wishlistService } from "@/global/services/wishlist/wishlistService";

export function useAddToWishlist() {
  const { executeRequest, ...rest } = useRequestHandler<
    number,
    AddToWishlistResponse
  >(wishlistService.addToWishlist);

  return { handleAddToWishlist: executeRequest, ...rest };
}

export function useRemoveFromWishlist() {
  const { executeRequest, ...rest } = useRequestHandler<
    number,
    RemoveFromWishlistResponse
  >(wishlistService.removeFromWishlist);

  return { handleRemoveFromWishlist: executeRequest, ...rest };
}

export function useGetWishlist() {
  const { executeRequest, ...rest } = useRequestHandler<
    void,
    GetWishlistResponse
  >(wishlistService.getWishlist);

  return { handleGetWishlist: executeRequest, ...rest };
}
