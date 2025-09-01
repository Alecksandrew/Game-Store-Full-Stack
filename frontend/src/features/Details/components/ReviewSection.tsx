import { useContext, type JSX } from "react";
import ReviewForm from "./ReviewForm";
import { useGetReviewsByGame } from "../hooks/useGetReviewsByGame";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import ReviewCard from "./ReviewCard";
import type { ReviewApiResponseType } from "../types/ReviewApiResponseType";

export default function ReviewSection({ className }: { className?: string }) {
  const dataContext = useContext(GameDetailsDataContext);
  const {
    data: reviewData,
    isLoading,
    warningComponent,
    warningType,
  } = useGetReviewsByGame(dataContext.id);

  function listReviewCards(reviewData:ReviewApiResponseType | null) {
    if (reviewData == null) return;

    return reviewData?.data?.map((review, index) => {
      return (
        <ReviewCard
          key={index}
          userName={review.username}
          rating={review.rating}
          createdAt={review.createdAt}
          description={review.description}
        />
      );
    });
  }
  return (
    <section className={className}>
      <h2 className="text-text-primary text-3xl mb-3">Reviews</h2>
      <ReviewForm />
      <div className="flex flex-col gap-2">{listReviewCards(reviewData)}</div>
    </section>
  );
}
