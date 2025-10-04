import { useContext, useState } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import isUserLogged from "@/global/utils/isUserLogged";
import { useGetReviewsByGame } from "./useGetReviewsByGame";
import { useGetMyReviewsByGame } from "./useGetMyReviewsByGame";

export default function useReviewManagement() {
  const [reviewVersion, setReviewVersion] = useState(0); // State to update review section whem a new review is created or updated...
  const { gameDetails } = useContext(GameDetailsDataContext);

  //If user is logged, then we gonna fetch only his reviews and the rest of other reviews
  //Else we gonna fetch all reviews
  const isUserLoggedValue: boolean = isUserLogged();

  const { data: reviewData } = useGetReviewsByGame(
    gameDetails.id,
    isUserLoggedValue,
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
