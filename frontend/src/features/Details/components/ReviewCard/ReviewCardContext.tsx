import { createContext } from "react";

export type ReviewCardContextType = {
  id: number;
  rating: number;
  description: string;
  createdAt: string;
  lastUpdatedAt: string | null;
  userName: string;
};

const reviewCardDefaultContext: ReviewCardContextType = {
  id: 0,
  rating: 1,
  description: "string",
  createdAt: "string",
  lastUpdatedAt: "string",
  userName: "string",
};

export const ReviewCardContext = createContext(reviewCardDefaultContext);
