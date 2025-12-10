import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import KeysModal from "../KeysModal";
import * as useAdminHooks from "../../../hooks/useAdmin";

// Mock the hook
vi.mock("../../../hooks/useAdmin", () => ({
  useAddKeys: vi.fn(),
}));

// Mock the child component (KeysForm) to test integration without implementation details
vi.mock("../../KeysForm", () => ({
  default: ({ onSubmit, onCancel, gameName }: any) => (
    <div data-testid="keys-form">
      <span>Form for {gameName}</span>
      <button onClick={() => onSubmit(["KEY1"])}>Submit Mock</button>
      <button onClick={onCancel}>Cancel Mock</button>
    </div>
  ),
}));

// Mock Modal components since they might use portals or complex logic
vi.mock("@/global/components/Modal", () => ({
  Modal: {
    Root: ({ children, isOpen }: any) =>
      isOpen ? <div>{children}</div> : null,
    Content: ({ children }: any) => <div>{children}</div>,
  },
}));

describe("KeysModal", () => {
  const mockHandleAddKeys = vi.fn();
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAdminHooks.useAddKeys as any).mockReturnValue({
      handleAddKeys: mockHandleAddKeys,
      isLoading: false,
      warningComponent: null,
    });
  });

  it("should render correctly when open", () => {
    render(
      <KeysModal
        isOpen={true}
        gameId={1}
        gameName="Test Game"
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByTestId("keys-form")).toBeInTheDocument();
    expect(screen.getByText("Form for Test Game")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(
      <KeysModal
        isOpen={false}
        gameId={1}
        gameName="Test Game"
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByTestId("keys-form")).not.toBeInTheDocument();
  });

  it("should call handleAddKeys and onSuccess when form submits", async () => {
    mockHandleAddKeys.mockResolvedValue({});

    render(
      <KeysModal
        isOpen={true}
        gameId={123}
        gameName="Test Game"
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.click(screen.getByText("Submit Mock"));

    await waitFor(() => {
      expect(mockHandleAddKeys).toHaveBeenCalledWith({
        gameId: 123,
        data: { keys: ["KEY1"] },
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("should call onClose when form cancels", () => {
    render(
      <KeysModal
        isOpen={true}
        gameId={1}
        gameName="Test Game"
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.click(screen.getByText("Cancel Mock"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
