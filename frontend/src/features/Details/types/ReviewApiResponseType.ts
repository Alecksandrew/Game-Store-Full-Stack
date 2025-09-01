export type ReviewApiResponseType = {
  data: {
    id: number;
    rating: number;
    description: string;
    createdAt: string;
    username: string;
  }[];
  nextCursor: {
    lastCreatedAt: string;
    lastId: number;
  } | null;
};
