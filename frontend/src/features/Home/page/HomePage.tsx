import { GameCardWithPrice } from "../components/GameCard/GameCardPresets";
import type { GameCardData } from "../types/GameCardType";
import CircularProgress from "@mui/material/CircularProgress";
import { usePaginatedGames } from "../hooks/usePaginatedGames";
import { useState } from "react";
import MainSection from "../components/MainSection";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Header";
import PaginationRounded from "@/global/components/PaginationRounded";
import { SearchForm } from "@/global/components/SearchForm";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { SearchFormData } from "@/global/types/searchFormType";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, warningComponent, warningType } = usePaginatedGames({
    currentPage,
    searchTerm,
  });

  const handleSearchSubmit: SubmitHandler<FieldValues> = (data) => {
    setSearchTerm(data.gameName);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  function listGameCards(gamesData: GameCardData[]) {
    console.log(gamesData);
    if (gamesData == null) return;

    return gamesData.map((game) => {
      return (
        <li key={game.name}>
          <GameCardWithPrice gameData={game} className="h-full" />
        </li>
      );
    });
  }

  return (
    <>
      {warningType == "error" ? warningComponent : null}
      <div className="bg-bg-primary min-h-screen py-4">
        <div className="w-8/10 max-w-[1000px] mx-auto">
          <MainSection />
          <CategoryCard />
          <SearchForm onSubmit={handleSearchSubmit} />

          {isLoading ? (
            <div className="flex justify-center items-center min-h-100">
              <CircularProgress size="4rem" className="mx-auto" />
            </div>
          ) : data?.length == 0 || data?.length == null ? (
            <p className="min-[40dvh] text-text-primary text-center my-50 text-3xl italic">
              No game was found! :(
            </p>
          ) : (
            <>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-5">
                {data != null ? listGameCards(data) : null}
              </ul>
              <div className="mx-auto mt-10 rounded w-fit p-2">
                <PaginationRounded
                  count={10}
                  page={currentPage}
                  onChange={handlePageChange}
                  theme="light"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
