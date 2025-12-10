import { SearchForm } from "@/global/components/SearchForm";
import { useGameDashboardContext } from "../context";

export function Search() {
  const { handleSearch } = useGameDashboardContext();

  return (
    <SearchForm
      onSubmit={(data) => handleSearch(data as { gameName: string })}
      placeholder="Search in admin panel..."
    />
  );
}
