import { useContext, useState, type JSX } from "react";
import ReviewForm from "./ReviewForm";
import { useGetReviewsByGame } from "../hooks/useGetReviewsByGame";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import ReviewCard from "./ReviewCard";
import type { ReviewApiResponseType } from "../types/ReviewApiResponseType";




export default function ReviewSection({ className }: { className?: string }) {
  const [reviewVersion, setReviewVersion] = useState(0);
  const dataContext = useContext(GameDetailsDataContext);
  const {
    data: reviewData,
    isLoading,
    warningComponent,
    warningType,
  } = useGetReviewsByGame(dataContext.id, reviewVersion);

  function handleReviewSuccess() {
    setReviewVersion((currentVersion) => currentVersion + 1);
  };

  function listReviewCards(reviewData: ReviewApiResponseType | null) {
    if (reviewData == null) return;

    return reviewData?.data?.map((review, index) => {
      const formatedDate = new Date(review.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      return (
        <ReviewCard
          key={index}
          userName={review.userName}
          rating={review.rating}
          createdAt={formatedDate}
          description={review.description}
        />
      );
    });
  }
  return (
    <section className={className}>
      <h2 className="text-text-primary text-3xl mb-3">Reviews</h2>
      <ReviewForm onReviewSubmitSuccess={handleReviewSuccess}/>
      <div className="flex flex-col gap-4 mt-5">{listReviewCards(reviewData)}</div>
    </section>
  );
}
