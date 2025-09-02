import { useContext, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useGetReviewsByGame } from "../hooks/useGetReviewsByGame";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import { ReviewCardEditable, ReviewCardStandard } from "./ReviewCard/ReviewCard.presets";
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
  }

  function listReviewCards(reviewData: ReviewApiResponseType | null) {
    if (reviewData == null) return;

    return reviewData?.data?.map((review, index) => {
      return (
        <li key={index}>
          <ReviewCardStandard data={review} />
        </li>
      );
    });
  }
  return (
    <section className={className}>
      <h2 className="text-text-primary text-3xl mb-3">Reviews</h2>
      <ReviewForm onReviewSubmitSuccess={handleReviewSuccess} />
      {reviewData?.data && reviewData?.data?.[0] && <ReviewCardEditable data={reviewData?.data[0]}/>}
      <ul className="flex flex-col gap-4 mt-5">
        {listReviewCards(reviewData)}
      </ul>
    </section>
  );
}
