
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import { Warning } from "../../../components/Warning";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";

import { type ResetPasswordFormProps } from "../types/ResetPasswordFormType";
import { type ResetPasswordFormData } from "../types/ResetPasswordFormType";
import { useAuthForm } from "../hooks/useAuth";

export default function ResetPasswordForm({ className }:ResetPasswordFormProps) {
  const { register, handleSubmit, formState, getValues } =
    useForm<ResetPasswordFormData>();
  const { warning, onSubmit, emptyWarningState, setWarning } =
    useAuthForm<ResetPasswordFormData>("/reset-password");

  return (
    <>
      {warning.message !== "" ? (
        <Warning
          message={warning.message}
          type={warning.type}
          onClose={() => setWarning(emptyWarningState)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${className}`}>
        <FormHeader
          title="Update your password"
          subTitle="Set a new password and get back to enjoy daily game deals"
        />
        <Input
          title="New password"
          type="password"
          placeholder="Create a password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          errorMessage={formState.errors.password?.message}
        />
        <Input
          title="Confirm new password"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          errorMessage={formState.errors.confirmPassword?.message}
        />
        <Button title="Reset password" type="submit" />
      </form>
    </>
  );
}
