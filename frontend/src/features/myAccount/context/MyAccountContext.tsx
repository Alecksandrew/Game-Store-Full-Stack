import { createContext } from 'react';
import type { MyAccountContextType } from '../types/myAccountTypes';

export const MyAccountContext = createContext<MyAccountContextType>({
  myAccountData: null,
  isLoading: true,
  isLoggedIn: false,
  handleLogout: () => {},
  handleLoginSuccess: async () => {},
});