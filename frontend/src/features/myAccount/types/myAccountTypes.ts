
export type MyAccountData = {
  userName: string;
  email: string;
};

export type MyAccountContextType = {
  myAccountData: MyAccountData | null;
  isLoading: boolean;
};