import { useCallback, useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import SearchGameForm from "../components/SearchGameForm";
import { apiClient } from "@/global/services/apiClient";
import { useApi } from "@/global/hooks/useApi";
import type { GameCardData } from "../types/GameCardType";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchGamesForPage = useCallback(() => {
    const url = `${API_ROUTES.GAMES.POPULAR.SUMMARY_INFOS}?page=${currentPage}&pageSize=12`;
    return apiClient<GameCardData[]>(url);
  }, [currentPage]);

  const { data, isLoading, execute, warningComponent, warningType } = useApi<
    void,
    GameCardData[]
  >(fetchGamesForPage);

  useEffect(() => {
    execute();
  }, [execute]);

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
      {warningType == "error" ? warningComponent : null}

      <div className="bg-bg-primary min-h-screen">
        <div className="w-8/10 max-w-[1300px] mx-auto">
          <SearchGameForm />
          {isLoading ? (
            <div className="flex justify-center items-center min-h-100">
              <CircularProgress size="4rem" className="mx-auto"/>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-5">
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
          )}
        </div>
      </div>
    </>
  );
}
