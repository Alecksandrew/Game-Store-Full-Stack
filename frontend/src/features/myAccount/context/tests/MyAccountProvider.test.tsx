
import { render, screen, waitFor, act, cleanup } from "@testing-library/react";
import { vi, it, describe, beforeEach, expect, afterEach } from "vitest";
import { MyAccountProvider } from "../MyAccountProvider";
import { useGetMyAccountData } from "../../hooks/useMyAccount";
import { MyAccountContext } from "../MyAccountContext";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useMyAccount", () => ({
  useGetMyAccountData: vi.fn(),
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});


const TestConsumer = () => {
  const { myAccountData, isLoggedIn, isLoading, handleLoginSuccess, handleLogout } =
    useContext(MyAccountContext);

  return (
    <div>
      <div data-testid="is-loading">{isLoading ? "true" : "false"}</div>
      <div data-testid="is-logged-in">{isLoggedIn ? "true" : "false"}</div>
      <div data-testid="user-name">
        {myAccountData?.userName ?? "No user"}
      </div>
      <button onClick={() => handleLoginSuccess("fake-jwt", "fake-refresh")}>
        Login
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const renderProvider = () => {
  return render(
    <MyAccountProvider>
      <TestConsumer />
    </MyAccountProvider>
  );
};

const mockHandleGetMyAccount = vi.fn();


describe("MyAccountProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    (useGetMyAccountData as vi.Mock).mockReturnValue({
      handleGetMyAccount: mockHandleGetMyAccount,
      isLoading: false,
    });
  });

  afterEach(() => {
    cleanup();
  });


  describe("when user is not authenticated", () => {
    it("should render with initial state and not attempt to fetch user data", () => {
      renderProvider();

      expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
      expect(screen.getByTestId("user-name")).toHaveTextContent("No user");
      expect(screen.getByTestId("is-loading")).toHaveTextContent("false");
      expect(mockHandleGetMyAccount).not.toHaveBeenCalled();
    });
  });


  describe("authentication flows", () => {
    const userData = {
      userName: "Test User",
      email: "test@example.com",
      role: "user",
    };

    it("should fetch user data and log in if a token is present on initial render", async () => {
      localStorageMock.setItem("jwtToken", "valid-token");
      mockHandleGetMyAccount.mockResolvedValue(userData);

      renderProvider();

      expect(mockHandleGetMyAccount).toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
      });
      expect(screen.getByTestId("user-name")).toHaveTextContent(userData.userName);
    });

    it("should handle failed data fetch by logging out the user", async () => {
      localStorageMock.setItem("jwtToken", "invalid-token");
      mockHandleGetMyAccount.mockResolvedValue(null);

      renderProvider();

      expect(mockHandleGetMyAccount).toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
      });
      expect(screen.getByTestId("user-name")).toHaveTextContent("No user");
      expect(localStorageMock.getItem("jwtToken")).toBeNull();
    });

    it("handleLoginSuccess should set tokens, fetch data, and update context", async () => {
      mockHandleGetMyAccount.mockResolvedValue(userData);

      renderProvider();
      const loginButton = screen.getByRole("button", { name: /login/i });

      expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");

      await act(async () => {
        await userEvent.click(loginButton);
      });

      expect(localStorageMock.getItem("jwtToken")).toBe("fake-jwt");
      expect(localStorageMock.getItem("refreshToken")).toBe("fake-refresh");
      expect(mockHandleGetMyAccount).toHaveBeenCalled();

      await waitFor(() => {
        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
      });
      expect(screen.getByTestId("user-name")).toHaveTextContent(userData.userName);
    });

    it("handleLogout should clear user data, tokens, and update context", async () => {
      localStorageMock.setItem("jwtToken", "valid-token");
      mockHandleGetMyAccount.mockResolvedValue(userData);
      renderProvider();
      await waitFor(() => {
        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
      });

      const logoutButton = screen.getByRole("button", { name: /logout/i });

      await act(async () => {
        await userEvent.click(logoutButton);
      });

      expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
      expect(screen.getByTestId("user-name")).toHaveTextContent("No user");
      expect(localStorageMock.getItem("jwtToken")).toBeNull();
      expect(localStorageMock.getItem("refreshToken")).toBeNull();
    });
  });

  
  describe("loading state", () => {
    it("should expose the isLoading state from the underlying hook", () => {
      (useGetMyAccountData as vi.Mock).mockReturnValue({
        handleGetMyAccount: mockHandleGetMyAccount,
        isLoading: true,
      });

      renderProvider();

      expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
    });
  });
});
