import { useState, useEffect, type ReactNode, useCallback } from "react";
import { MyAccountContext } from "./MyAccountContext";
import type { MyAccountData } from "../types/myAccountTypes";
import { useGetMyAccountData } from "../hooks/useGetMyAccountData";

function isUserLogged() {
  const jwtToken = localStorage.getItem("jwtToken");

  return jwtToken !== "" && jwtToken != null ? true : false;
}

export const MyAccountProvider = ({ children }: { children: ReactNode }) => {
  const [myAccountData, setMyAccountData] = useState<MyAccountData | null>(
    null
  );
  const { execute, isLoading } = useGetMyAccountData();

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
    const enrichedUserData = await execute();
    console.log(enrichedUserData)
    if (enrichedUserData) {
      setMyAccountData(enrichedUserData);
    } else {

      handleLogout();
    }
  }, [execute, handleLogout]);

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
