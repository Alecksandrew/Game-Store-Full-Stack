export type ResetPasswordFormProps = {
    className?: string
}

export type ResetPasswordFormData = {
  email: string,
  token: string,
  password:        string;
  confirmPassword: string;
};