export type ReviewApiResponseType = {
  data: {
    id: number;
    rating: number;
    description: string;
    createdAt: string;
    lastUpdatedAt: string,
    userName: string;
  }[];
  nextCursor: {
    lastCreatedAt: string;
    lastId: number;
  } | null;
};


export type MyReviewApiResponseType = {
    id: number;
    rating: number;
    description: string;
    createdAt: string;
    lastUpdatedAt: string,
    userName: string;
}[];
