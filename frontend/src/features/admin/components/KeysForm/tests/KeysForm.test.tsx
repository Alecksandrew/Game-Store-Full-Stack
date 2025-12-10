import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import KeysForm from "../KeysForm";

describe("KeysForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <KeysForm
        gameName="Test Game"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Add keys to Test Game")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Paste all keys here/i)
    ).toBeInTheDocument();
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <KeysForm
        gameName="Test Game"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should submit keys correctly", async () => {
    render(
      <KeysForm
        gameName="Test Game"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const textarea = screen.getByPlaceholderText(/Paste all keys here/i);
    fireEvent.change(textarea, { target: { value: "KEY1, KEY2" } });

    fireEvent.click(screen.getByText("Add keys"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(["KEY1", "KEY2"]);
    });
  });

  it("should not submit if keys are empty and show error", async () => {
    render(
      <KeysForm
        gameName="Test Game"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const textarea = screen.getByPlaceholderText(/Paste all keys here/i);
    // Enter only commas and spaces, which satisfies 'required' but fails our logic
    fireEvent.change(textarea, { target: { value: " , , , " } });

    fireEvent.click(screen.getByText("Add keys"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter at least one valid key.")
      ).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
