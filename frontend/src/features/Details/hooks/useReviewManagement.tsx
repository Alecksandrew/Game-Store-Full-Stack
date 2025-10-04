import { useContext, useState } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import isUserLogged from "@/global/utils/isUserLogged";
import { useGetReviewsByGame } from "./useGetReviewsByGame";
import { useGetMyReviewsByGame } from "./useGetMyReviewsByGame";
import type { MyReviewApiResponseType, ReviewApiResponseType } from "../types/ReviewApiResponseType";
import { ReviewCardEditable, ReviewCardStandard } from "../components/ReviewCard/ReviewCard.presets";


export default function useReviewManagement(){

 const [reviewVersion, setReviewVersion] = useState(0); // State to update review section whem a new review is created or updated...
  const {gameDetails} = useContext(GameDetailsDataContext);
  
  //If user is logged, then we gonna fetch only his reviews and the rest of other reviews
  //Else we gonna fetch all reviews
  const isUserLoggedValue:boolean = isUserLogged();
  
  
  const {
    data: reviewData
  } = useGetReviewsByGame(gameDetails.id, isUserLoggedValue,  reviewVersion);
  
  const {
    data: myReviewData,
  } = useGetMyReviewsByGame(gameDetails.id, reviewVersion)


  
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

  return {
    handleReviewSuccess,
    listMyReviewCards,
    listReviewCards,
    reviewData,
    myReviewData
  }

}