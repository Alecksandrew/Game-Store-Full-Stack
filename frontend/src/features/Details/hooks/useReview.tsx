import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { reviewService } from "@/global/services/review/reviewService";
import { useContext, useEffect, useCallback } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import type {
  GetReviewsResponse,
  GetMyReviewsResponse,
  CreateReviewResponse,
  UpdateReviewResponse,
  DeleteReviewResponse,
  UpsertReviewRequest,
} from "@/global/services/review/types";

type GetReviewsParams = { gameId: number; isUserLogged: boolean };
type CreateReviewParams = { gameId: number; data: UpsertReviewRequest };
type UpdateReviewParams = { reviewId: number; data: UpsertReviewRequest };

// --- Hooks ---

export function useGetReviews() {
  const { executeRequest: handleGetReviews, ...rest } = useRequestHandler<
    GetReviewsParams,
    GetReviewsResponse
  >((params) => reviewService.getReviews(params.gameId, params.isUserLogged));
  return { handleGetReviews, ...rest };
}

export function useGetMyReviews() {
  const { executeRequest: handleGetMyReviews, ...rest } = useRequestHandler<
    number,
    GetMyReviewsResponse
  >(reviewService.getMyReviews);
  return { handleGetMyReviews, ...rest };
}

export function useCreateReview() {
  const { executeRequest: handleCreateReview, ...rest } = useRequestHandler<
    CreateReviewParams,
    CreateReviewResponse
  >((params) => reviewService.createReview(params.gameId, params.data));
  return { handleCreateReview, ...rest };
}

export function useUpdateReview() {
  const { executeRequest: handleUpdateReview, ...rest } = useRequestHandler<
    UpdateReviewParams,
    UpdateReviewResponse
  >((params) => reviewService.updateReview(params.reviewId, params.data));
  return { handleUpdateReview, ...rest };
}

export function useDeleteReview() {
  const { executeRequest: handleDeleteReview, ...rest } = useRequestHandler<
    number,
    DeleteReviewResponse
  >(reviewService.deleteReview);
  return { handleDeleteReview, ...rest };
}



export function useReviewManagement() {
  const { gameDetails } = useContext(GameDetailsDataContext);
  const { isLoggedIn } = useContext(MyAccountContext);

  const { data: reviewData, handleGetReviews, isLoading: isLoadingReviews } = useGetReviews();
  const { data: myReviewData, handleGetMyReviews, isLoading: isLoadingMyReviews } = useGetMyReviews();

 
  const fetchAllReviews = useCallback(() => {
    if (gameDetails.id && gameDetails.id !== 0) {
     
      handleGetReviews({ gameId: gameDetails.id, isUserLogged: isLoggedIn });
      if (isLoggedIn) {
        handleGetMyReviews(gameDetails.id);
      }
    }
  }, [gameDetails.id, isLoggedIn, handleGetReviews, handleGetMyReviews]);

  
  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  
  function handleReviewSuccess() {
    console.log("Review action successful, refetching reviews...");
    fetchAllReviews();
  }

  return {
    handleReviewSuccess,
    reviewData,
    myReviewData,
    isLoading: isLoadingReviews || isLoadingMyReviews,
  };
}