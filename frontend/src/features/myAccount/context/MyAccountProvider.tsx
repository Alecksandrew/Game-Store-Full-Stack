import { useState, useEffect, type ReactNode } from "react";
import { MyAccountContext } from "./MyAccountContext";
import { fetchWithAuth } from "@/global/services/fetchWithAuth";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { MyAccountData } from "../types/myAccountTypes";

function isUserLogged() {
  const jwtToken = localStorage.getItem("jwtToken");

  return jwtToken !== "" && jwtToken != null ? true : false;
}

export const MyAccountProvider = ({ children }: { children: ReactNode }) => {
  const [myAccountData, setMyAccountData] = useState<MyAccountData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getUserInfos() {
    try {
      const response = await fetchWithAuth(API_ROUTES.ACCOUNT.ME, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setMyAccountData(data);
    } catch (error) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isUserLogged()) {
      getUserInfos();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLoginSuccess = async (jwtToken: string, refreshToken: string) => {
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("refreshToken", refreshToken);
    await getUserInfos();
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    setMyAccountData(null);
  };

  const isLoggedIn = myAccountData != null;

  return (
    <MyAccountContext.Provider
      value={{
        myAccountData,
        isLoading,
        isLoggedIn,
        handleLogout,
        handleLoginSuccess,
      }}
    >
      {children}
    </MyAccountContext.Provider>
  );
};
