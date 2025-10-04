import ReviewForm from "./ReviewForm";
import useReviewManagement from "../hooks/useReviewManagement";
import type { MyReviewApiResponseType, ReviewApiResponseType } from "../types/ReviewApiResponseType";
import { ReviewCardEditable, ReviewCardStandard } from "./ReviewCard/ReviewCard.presets";

export default function ReviewSection({ className }: { className?: string }) {
  const {
    handleReviewSuccess,
    reviewData,
    myReviewData
  } = useReviewManagement();


  function listMyReviewCards(myReviewData:MyReviewApiResponseType | null){
     if (reviewData == null) return;

    return myReviewData?.map((review, index) => {
      return (
        <li key={index}>
          <ReviewCardEditable data={review} onReviewUpdate={handleReviewSuccess} />
        </li>
      );
    });
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
      <ReviewForm mode="create" onReviewSubmitSuccess={handleReviewSuccess} />
      <ul className="flex flex-col gap-4 mt-5">
        {listMyReviewCards(myReviewData)}
        {listReviewCards(reviewData)}
      </ul>
    </section>
  );
}
