import { useContext, useState } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";

import { useGetReviewsByGame } from "./useGetReviewsByGame";
import { useGetMyReviewsByGame } from "./useGetMyReviewsByGame";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";

export default function useReviewManagement() {
  const [reviewVersion, setReviewVersion] = useState(0); // State to update review section whem a new review is created or updated...
  const { gameDetails } = useContext(GameDetailsDataContext);
  const {isLoggedIn} = useContext(MyAccountContext)

  //If user is logged, then we gonna fetch only his reviews and the rest of other reviews
  //Else we gonna fetch all reviews
  const { data: reviewData } = useGetReviewsByGame(
    gameDetails.id,
    isLoggedIn,
    reviewVersion
  );

  const { data: myReviewData } = useGetMyReviewsByGame(
    gameDetails.id,
    reviewVersion
  );

  function handleReviewSuccess() {
    setReviewVersion((currentVersion) => currentVersion + 1);
  }

  return {
    handleReviewSuccess,
    reviewData,
    myReviewData,
  };
}
