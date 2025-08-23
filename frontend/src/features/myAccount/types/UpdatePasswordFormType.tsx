import type { ApiErrorDetail } from "@/global/types/responseApiType";

export type UpdatePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};


export type UpdatePasswordResponse = {
  message: string
  errors?: ApiErrorDetail[];
};