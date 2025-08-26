import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import SearchGameForm from "../components/SearchGameForm";
import { apiClient } from "@/global/services/apiClient";
import { useApi } from "@/global/hooks/useApi";
import type { GameCardData } from "../types/GameCardType";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";




export default function HomePage() {
    const { data, isLoading, execute, warningComponent, warningType } = useApi<void, GameCardData[]>(
      () => apiClient(API_ROUTES.GAMES.POPULAR.SUMMARY_INFOS + "?amount=12")
    );

    
    useEffect(() => {
        execute();
    }, []);
    

  function listGameCards(gamesData:GameCardData[]){
    console.log(gamesData);
    if(gamesData == null) return;

    return gamesData.map(game => {
      return (
      <li key={game.name}>
        <GameCard gameData={game}/>
      </li>
      )
    })
  }


    return (
      <>
      {warningType == "error" ? warningComponent : null}
      <div className="bg-bg-primary min-h-screen">
        <div className="w-8/10 max-w-[1300px] mx-auto">
          <SearchGameForm/>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-5">{data != null ? listGameCards(data) : null }</ul>
        </div>
      </div>
    </>
      
    )
}