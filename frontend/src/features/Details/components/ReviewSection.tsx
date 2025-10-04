import ReviewForm from "./ReviewForm";
import useReviewManagement from "../hooks/useReviewManagement";

export default function ReviewSection({ className }: { className?: string }) {
  const {
    handleReviewSuccess,
    listMyReviewCards,
    listReviewCards,
    reviewData,
    myReviewData
  } = useReviewManagement();

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
