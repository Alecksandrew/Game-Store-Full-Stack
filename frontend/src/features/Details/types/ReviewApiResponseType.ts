export type ReviewApiResponseType = {
  data: {
    id: number;
    rating: number;
    description: string;
    createdAt: string;
    userName: string;
  }[];
  nextCursor: {
    lastCreatedAt: string;
    lastId: number;
  } | null;
};
