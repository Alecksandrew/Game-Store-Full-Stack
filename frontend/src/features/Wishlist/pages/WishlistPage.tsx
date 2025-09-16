import { useContext, useEffect } from "react";
import { GameCardWithPrice } from "@/features/Home/components/GameCard/GameCardPresets";
import type { GameCardData } from "@/features/Home/types/GameCardType";
import { useGetWishlist } from "@/features/Wishlist/hooks/useWishlist";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "@/features/Home/components/Header";
import isUserLogged from "@/global/utils/isUserLogged";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

export default function WishlistPage() {

const { wishlist, isLoading } = useContext(WishlistContext);

  function listGameCards(gamesData: GameCardData[]) {
    if (!gamesData) return null;
    return gamesData.map((game) => (
      <li key={game.id}>
        <GameCardWithPrice gameData={game} className="h-full" />
      </li>
    ));
  }

 
  const renderContent = () => {

    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <CircularProgress size="4rem" />
        </div>
      );
    }

   
    if (!wishlist || wishlist.length === 0) {
      return (
        <p className="min-h-[50vh] flex items-center justify-center text-text-primary text-center text-3xl italic">
          Your wishlist is empty :(
        </p>
      );
    }
    return (
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-5">
        {listGameCards(wishlist)}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-bg-primary min-h-screen py-10">
        <div className="w-9/10 max-w-[1200px] mx-auto">
          <h1 className="text-4xl text-text-primary">Your wishlist</h1>
          <p className="font-inter font-light italic text-text-primary mb-5">{wishlist?.length !== 0 && wishlist.length + " games saved for later"}</p>
          {renderContent()}
        </div>
      </div>
    </>
  );
}