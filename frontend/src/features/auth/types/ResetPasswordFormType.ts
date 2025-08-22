export type ResetPasswordFormProps = {
    className?: string
}

export type ResetPasswordFormData = {
  email: string,
  token: string,
 newPassword:        string; 
  confirmNewPassword: string; 
};