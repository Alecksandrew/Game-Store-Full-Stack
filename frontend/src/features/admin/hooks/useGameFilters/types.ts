import type { FieldValues, SubmitHandler } from "react-hook-form";

export interface UseGameFiltersReturn {
  currentPage: number;
  searchTerm: string;
  sortBy: string;
  isAscending: boolean;
  handlePageChange: (newPage: number) => void;
  handleSearch: SubmitHandler<FieldValues>;
  handleSort: (column: string) => void;
}
