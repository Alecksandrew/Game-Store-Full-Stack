import type { ReviewApiResponseType, MyReviewApiResponseType } from '@/features/Details/types/ReviewApiResponseType';


export type UpsertReviewRequest = {
  rating: number;
  description: string;
};



export type GetReviewsResponse = ReviewApiResponseType;


export type GetMyReviewsResponse = MyReviewApiResponseType;


export type CreateReviewResponse = ReviewApiResponseType;


export type UpdateReviewResponse = void; 

export type DeleteReviewResponse = void;
