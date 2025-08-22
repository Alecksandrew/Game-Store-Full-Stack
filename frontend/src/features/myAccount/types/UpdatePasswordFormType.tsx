import type { ApiErrorDetail } from "../../../types/responseApiType";

export type UpdatePasswordFormData = {
  password: string,
  newPassword:        string; 
  confirmNewPassword: string; 
};


export type UpdatePasswordResponse = {
  message: string
  errors?: ApiErrorDetail[];
};