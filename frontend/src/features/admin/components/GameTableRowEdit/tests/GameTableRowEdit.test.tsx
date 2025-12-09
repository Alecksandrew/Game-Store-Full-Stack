import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import GameTableRowEdit from "../GameTableRowEdit";
import type { AdminGame } from "../../../types/gameDashboardTypes";

describe("GameTableRowEdit", () => {
  const mockGameInfo: AdminGame = {
    igdbId: 123,
    name: "Test Game",
    price: 100,
    discountPrice: 80,
    availableKeys: 5,
  };

  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const renderComponent = (isLoading = false) => {
    return render(
      <table>
        <tbody>
          <GameTableRowEdit
            gameInfo={mockGameInfo}
            onSave={mockOnSave}
            onCancel={mockOnCancel}
            isLoading={isLoading}
          />
        </tbody>
      </table>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render inputs with default values", () => {
    renderComponent();

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("80")).toBeInTheDocument();
  });

  it("should call onSave with form data when save button is clicked", async () => {
    renderComponent();

    const inputs = screen.getAllByRole("spinbutton");
    const priceInput = inputs[0];
    const discountInput = inputs[1];

    fireEvent.change(priceInput, { target: { value: "150" } });
    fireEvent.change(discountInput, { target: { value: "120" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
      // Note: The exact argument depends on how react-hook-form passes data.
      // Usually it passes the form data object.
      // We can check if it was called with an object containing the new values.
      const calledArg = mockOnSave.mock.calls[0][0];
      expect(calledArg.price).toBe("150");
      expect(calledArg.discountPrice).toBe("120");
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    renderComponent();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should disable buttons when isLoading is true", () => {
    renderComponent(true);

    const saveButton = screen.getByRole("button", { name: /saving.../i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
