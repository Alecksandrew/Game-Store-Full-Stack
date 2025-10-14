
export type MyAccountData = {
  userName: string;
  email: string;
};

export type MyAccountContextType = {
  myAccountData: MyAccountData | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleLoginSuccess: (jwtToken: string, refreshToken: string) =>  Promise<void>;
};