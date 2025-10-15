
import { useState } from "react";
import { usePaginatedGames } from "@/features/Home/hooks/usePaginatedGames";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import type { GameCardData } from "@/global/components/GameCard/types";
import { GameCardWithPrice } from "@/global/components/GameCard/GameCard.presets";
import { useParams } from "react-router";

export default function CategoryPage() {
  const { genre } = useParams<{ genre: string }>();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, warningComponent, warningType } = usePaginatedGames({
    genre: genre || undefined,
    currentPage,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  function listGameCards(gamesData: GameCardData[]) {
    if (gamesData == null) return null;

    return gamesData.map((game) => (
      <li key={game.id}>
        <GameCardWithPrice gameData={game} className="h-full" />
      </li>
    ));
  }

  return (
    <>
      {warningType === "error" && warningComponent}
      <div className="bg-bg-primary min-h-screen py-10">
        <div className="w-9/10 max-w-[1200px] mx-auto">
          <h1 className="text-4xl text-text-primary capitalize">
            {genre ? `${genre} Games` : "Games"}
          </h1>
          <p className="font-inter font-light italic text-text-primary mb-5">
           Explore our selection of games
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <CircularProgress size="4rem" />
            </div>
          ) : !data || data.length === 0 ? (
            <p className="min-h-[50vh] flex items-center justify-center text-text-primary text-center text-3xl italic">
              Nenhum jogo encontrado nesta categoria :(
            </p>
          ) : (
            <>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-5">
                {listGameCards(data)}
              </ul>
              <div className="mx-auto mt-10 bg-primary rounded w-fit p-2">
                <Pagination
                  color="standard"
                  count={10}
                  page={currentPage}
                  onChange={(_event, value) => handlePageChange(_event, value)}
                   sx={{
                    ".MuiPagination-ul": {
                      "& .MuiPaginationItem-root": {
                        color: "#fff",
                        borderColor: "rgba(255, 255, 255, 0.25)",
                        "&:hover": {
                          backgroundColor: "rgba(65, 105, 225, 0.1)",
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#05080f",
                        color: "#fff",
                        borderColor: "#4169e1",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#3557b7",
                        },
                      },
                    },
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}