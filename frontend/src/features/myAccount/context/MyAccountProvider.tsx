import { useState, useEffect, type ReactNode } from 'react';
import { MyAccountContext } from './MyAccountContext'; 
import { fetchWithAuth } from '@/global/services/fetchWithAuth';
import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import isUserLogged from '@/global/utils/isUserLogged';
import type { MyAccountData } from '../types/myAccountTypes';

export const MyAccountProvider = ({ children }: { children: ReactNode }) => {
  const [myAccountData, setMyAccountData] = useState<MyAccountData | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLogged()) {
      async function getUserInfos() {
        try {
          const response = await fetchWithAuth(API_ROUTES.ACCOUNT.ME, {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          setMyAccountData(data); 
        } catch (error) {
          console.error(error);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("refreshToken");
        } finally {
          setIsLoading(false);
        }
      }
      getUserInfos();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <MyAccountContext.Provider value={{ myAccountData, isLoading }}> 
      {children}
    </MyAccountContext.Provider>
  );
};