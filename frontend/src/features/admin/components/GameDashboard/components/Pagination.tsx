import PaginationRounded from "@/global/components/PaginationRounded/PaginationRounded";
import { useGameDashboardContext } from "../context";

const PAGE_SIZE = 10;

export function Pagination() {
  const { totalCount, currentPage, handlePageChange } =
    useGameDashboardContext();

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (totalPages <= 1) return null;

  return (
    <PaginationRounded
      count={totalPages}
      page={currentPage}
      onPageChange={(_event, value) => handlePageChange(value)}
    />
  );
}
