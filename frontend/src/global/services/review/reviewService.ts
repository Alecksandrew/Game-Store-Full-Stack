import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import type {
  UpsertReviewRequest,
  GetReviewsResponse,
  GetMyReviewsResponse,
  CreateReviewResponse,
  UpdateReviewResponse,
  DeleteReviewResponse,
} from './types';
import { apiClient } from '../apiClient';

export const reviewService = {

  async getReviews(gameId: number, isUserLogged: boolean): Promise<GetReviewsResponse> {
    return apiClient<GetReviewsResponse>(
      API_ROUTES.REVIEWS.GET_BY_GAME_FUNCTION(gameId),
      { method: 'GET' },
      isUserLogged
    );
  },

  async getMyReviews(gameId: number): Promise<GetMyReviewsResponse> {
    return apiClient<GetMyReviewsResponse>(
      API_ROUTES.REVIEWS.GET_MY_REVIEWS_BY_GAME_FUNCTION(gameId),
      { method: 'GET' },
      true
    );
  },

  async createReview(gameId: number, request: UpsertReviewRequest): Promise<CreateReviewResponse> {
    return apiClient<CreateReviewResponse>(
      API_ROUTES.REVIEWS.CREATE_MY_REVIEW_BY_GAME_FUNCTION(gameId),
      { method: 'POST', body: request },
      true
    );
  },

  async updateReview(reviewId: number, request: UpsertReviewRequest): Promise<UpdateReviewResponse> {
    return apiClient<UpdateReviewResponse>(
      API_ROUTES.REVIEWS.UPDATE_MY_REVIEW_BY_GAME_FUNCTION(reviewId),
      { method: 'PATCH', body: request },
      true
    );
  },

  async deleteReview(reviewId: number): Promise<DeleteReviewResponse> {
    return apiClient<DeleteReviewResponse>(
      API_ROUTES.REVIEWS.DELETE_MY_REVIEW_BY_GAME_FUNCTION(reviewId),
      { method: 'DELETE' },
      true
    );
  },
};