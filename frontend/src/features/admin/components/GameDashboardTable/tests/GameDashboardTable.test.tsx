import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect, beforeEach } from "vitest";
import * as useAdminHook from "@/features/admin/hooks/useAdmin";
import type { AdminGame } from "@/features/admin/types/gameDashboardTypes";
import { GameDashboardTable } from "../../GameDashboardTable";

// Mocking child components and hooks
vi.mock("@/global/components/SearchForm", () => ({
  SearchForm: ({
    onSubmit,
  }: {
    onSubmit: (data: { gameName: string }) => void;
  }) => (
    <form
      data-testid="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ gameName: "test game" });
      }}
    >
      <input type="text" />
      <button type="submit">Search</button>
    </form>
  ),
}));

vi.mock("../../GameDashboardTable/GameDashboardHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="game-dashboard-header">Game Dashboard</div>,
}));

vi.mock("../../GameDashboardTable/GameDashboardTableHeader", () => ({
  GameDashboardTableHeader: () => (
    <thead data-testid="table-header">
      <tr>
        <th>Header</th>
      </tr>
    </thead>
  ),
}));

vi.mock("@/global/components/PaginationRounded/PaginationRounded", () => ({
  default: ({
    count,
    page,
    onPageChange,
  }: {
    count: number;
    page: number;
    onPageChange: (e: unknown, value: number) => void;
  }) => (
    <div data-testid="pagination">
      <p>Total Pages: {count}</p>
      <p>Current Page: {page}</p>
      <button onClick={(e) => onPageChange(e, 2)}>Go to Page 2</button>
    </div>
  ),
}));

vi.mock("../../KeysModal/KeysModal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    gameName,
    onClose,
    onSuccess,
  }: {
    isOpen: boolean;
    gameName: string;
    onClose: () => void;
    onSuccess: () => void;
  }) =>
    isOpen ? (
      <div data-testid="keys-modal">
        <h2>{gameName}</h2>
        <button onClick={onClose}>Close</button>
        <button onClick={onSuccess}>Success</button>
      </div>
    ) : null,
}));

vi.mock("../../GameDashboardTable/GameDashboardTableBody", () => ({
  GameDashboardTableBody: ({
    onOpenKeysModal,
  }: {
    onOpenKeysModal: (id: number, name: string) => void;
  }) => (
    <tbody data-testid="table-body">
      <tr>
        <td>
          <button onClick={() => onOpenKeysModal(1, "Test Game Name")}>
            Open Keys
          </button>
        </td>
      </tr>
    </tbody>
  ),
}));

// Mock the main hook
const mockUseGameDashboardTable = vi.spyOn(
  useAdminHook,
  "useGameDashboardTable"
);

const mockDefaultReturn = {
  gamesData: [] as AdminGame[],
  totalCount: 0,
  isLoading: false,
  warningType: "sucess" as "error" | "success",
  warningComponent: <></>,
  currentPage: 1,
  handlePageChange: vi.fn(),
  handleSearch: vi.fn(),
  handleSort: vi.fn(),
  sortBy: "igdbId",
  isAscending: true,
  handleGetInventory: vi.fn(),
  setData: vi.fn(),
};

describe("GameDashboardTable", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockUseGameDashboardTable.mockReturnValue(mockDefaultReturn);
  });

  test("should render the header and search form", () => {
    render(<GameDashboardTable />);
    expect(screen.getByText("Game Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
  });

  test("should not display pagination if total pages are less than or equal to 1", () => {
    mockUseGameDashboardTable.mockReturnValue({
      ...mockDefaultReturn,
      totalCount: 5, // totalPages will be 1
    });
    render(<GameDashboardTable />);
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  test("should display pagination when there are multiple pages", () => {
    mockUseGameDashboardTable.mockReturnValue({
      ...mockDefaultReturn,
      totalCount: 15, // totalPages will be 2
    });
    render(<GameDashboardTable />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("Total Pages: 2")).toBeInTheDocument();
  });

  test("should call handleSearch on form submission", () => {
    render(<GameDashboardTable />);
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);
    expect(mockDefaultReturn.handleSearch).toHaveBeenCalledWith({
      gameName: "test game",
    });
  });

  test("should call handlePageChange when a new page is selected", () => {
    mockUseGameDashboardTable.mockReturnValue({
      ...mockDefaultReturn,
      totalCount: 20, // To show pagination
    });
    render(<GameDashboardTable />);
    const page2Button = screen.getByRole("button", { name: /go to page 2/i });
    fireEvent.click(page2Button);
    expect(mockDefaultReturn.handlePageChange).toHaveBeenCalledWith(2);
  });

  test("should open and close the keys modal", () => {
    render(<GameDashboardTable />);

    // Modal should be closed initially
    expect(screen.queryByTestId("keys-modal")).not.toBeInTheDocument();

    // Open modal
    const openButton = screen.getByRole("button", { name: /open keys/i });
    fireEvent.click(openButton);

    // Modal should be open
    expect(screen.getByTestId("keys-modal")).toBeInTheDocument();
    expect(screen.getByText("Test Game Name")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByTestId("keys-modal")).not.toBeInTheDocument();
  });

  test("should call handleGetInventory on modal success action", () => {
    render(<GameDashboardTable />);

    // Open modal
    const openButton = screen.getByRole("button", { name: /open keys/i });
    fireEvent.click(openButton);

    // Click success button
    const successButton = screen.getByRole("button", { name: /success/i });
    fireEvent.click(successButton);

    // Modal should close and inventory should be refetched
    expect(screen.queryByTestId("keys-modal")).not.toBeInTheDocument();
    expect(mockDefaultReturn.handleGetInventory).toHaveBeenCalled();
  });

  test("should display a warning component when provided", () => {
    mockUseGameDashboardTable.mockReturnValue({
      ...mockDefaultReturn,
      warningType: "error",
      warningComponent: <div>Something went wrong</div>,
    });
    render(<GameDashboardTable />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
