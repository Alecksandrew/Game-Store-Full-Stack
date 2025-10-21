import type { ApiResponse } from '@/global/types/responseApiType';

export type UpdatePasswordRequest = {
  currentPassword:    string;
  newPassword:        string;
  confirmNewPassword: string;
};

export type UpdatePasswordResponse = ApiResponse;

export type GetMyAccountResponse = {
  userName: string;
  email: string;
};


export type DeleteAccountResponse = ApiResponse;
