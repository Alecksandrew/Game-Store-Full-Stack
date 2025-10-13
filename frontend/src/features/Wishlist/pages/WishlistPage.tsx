import { useContext} from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { WishlistContext } from "../context/WishlistContext";
import { GameCardWithPrice, type GameCardData } from "@/global/components/GameCard";

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