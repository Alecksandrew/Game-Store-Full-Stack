import { useState, useEffect, type ReactNode, useCallback } from "react";
import { MyAccountContext } from "./MyAccountContext";
import type { MyAccountData } from "./types";
import { useGetMyAccountData } from "../hooks/useMyAccount";


export const MyAccountProvider = ({ children }: { children: ReactNode }) => {
  const [myAccountData, setMyAccountData] = useState<MyAccountData | null>(
    null
  );
  const { handleGetMyAccount, isLoading } = useGetMyAccountData();

  const handleLoginSuccess = async (jwtToken: string, refreshToken: string) => {
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("refreshToken", refreshToken);
    await fetchAndSetUserData();
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    setMyAccountData(null);
  },[]);

  const fetchAndSetUserData = useCallback(async () => {
    if (!localStorage.getItem("jwtToken")) {
      return;
    }
    const enrichedUserData = await handleGetMyAccount();
    console.log(enrichedUserData)
    if (enrichedUserData) {
      // Ensure 'role' is always a string to satisfy MyAccountData type
      setMyAccountData({ ...enrichedUserData, role: enrichedUserData.role ?? "user" });
    } else {

      handleLogout();
    }
  }, [handleGetMyAccount, handleLogout]);

  useEffect(() => {
    fetchAndSetUserData();
  }, [fetchAndSetUserData]);

  

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
