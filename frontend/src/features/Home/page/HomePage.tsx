import GameCard from "../components/GameCard";
import SearchGameForm from "../components/SearchGameForm";
import type { GameCardData } from "../types/GameCardType";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { usePaginatedGames } from "../hooks/usePaginatedGames";
import { useState } from "react";
import MainSection from "../components/MainSection";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  /*
  const {
    data,
    isLoading,
    warningComponent,
    warningType,
  } = usePaginatedGames({searchTerm, currentPage});*/

  const handleSearchSubmit = (data: { gameName: string }) => {
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
          <GameCard gameData={game} />
        </li>
      );
    });
  }

  return (
    <>
      {/*warningType == "error" ? warningComponent : null */}

      <div className="bg-bg-primary min-h-screen py-4">
        <div className="w-8/10 max-w-[1000px] mx-auto">
        <MainSection/>
          <SearchGameForm onSubmit={handleSearchSubmit} />
          { /*isLoading ? (
            <div className="flex justify-center items-center min-h-100">
              <CircularProgress size="4rem" className="mx-auto" />
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-5">
                {data != null ? listGameCards(data) : null}
              </ul>
              <div className="mx-auto mt-10 bg-primary rounded w-fit p-2 ">
                <Pagination
                  color="standard"
                  count={10}
                  page={currentPage}
                  onChange={handlePageChange}
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
          )*/}
        </div>
      </div>
    </>
  );
}
