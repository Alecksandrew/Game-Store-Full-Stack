import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import GameTableRowDisplay from "../GameTableRowDisplay";
import type { gameTableRowProps } from "../../../types/gameTableRowType";

// Mock Table components to simplify rendering
describe("GameTableRowDisplay", () => {
  const mockGameInfo: gameTableRowProps = {
    igdbId: 123,
    name: "Test Game",
    price: 100,
    discountPrice: 80,
    availableKeys: 5,
  };

  const mockOnEdit = vi.fn();
  const mockOnOpenKeysModal = vi.fn();

  const renderComponent = () => {
    return render(
      <table>
        <tbody>
          <GameTableRowDisplay
            gameInfo={mockGameInfo}
            onEdit={mockOnEdit}
            onOpenKeysModal={mockOnOpenKeysModal}
          />
        </tbody>
      </table>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render game information correctly", () => {
    renderComponent();

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit game/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockGameInfo.igdbId);
  });

  it("should call onOpenKeysModal when keys button is clicked", () => {
    renderComponent();

    const keysButton = screen.getByTitle("Adicionar chaves");
    fireEvent.click(keysButton);

    expect(mockOnOpenKeysModal).toHaveBeenCalledWith(
      mockGameInfo.igdbId,
      mockGameInfo.name
    );
  });
});
