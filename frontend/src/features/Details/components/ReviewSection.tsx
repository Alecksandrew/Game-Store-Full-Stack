import { useContext, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useGetReviewsByGame } from "../hooks/useGetReviewsByGame";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import { ReviewCardEditable, ReviewCardStandard } from "./ReviewCard/ReviewCard.presets";
import type { MyReviewApiResponseType, ReviewApiResponseType } from "../types/ReviewApiResponseType";
import isUserLogged from "@/global/utils/isUserLogged";
import { useGetMyReviewsByGame } from "../hooks/useGetMyReviewsByGame";

export default function ReviewSection({ className }: { className?: string }) {
  const [reviewVersion, setReviewVersion] = useState(0);
  const dataContext = useContext(GameDetailsDataContext);
  const isUserLoggedVariable:boolean = isUserLogged();
  const {
    data: reviewData,
    isLoading,
  } = useGetReviewsByGame(dataContext.id, isUserLoggedVariable,  reviewVersion);
  const {
    data: myReviewData,
  } = useGetMyReviewsByGame(dataContext.id, reviewVersion)

 console.log(myReviewData)
 console.log(reviewData)
  function handleReviewSuccess() {
    setReviewVersion((currentVersion) => currentVersion + 1);
  }


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
