import { useForm } from "react-hook-form";
import { Input } from "@/global/components/Input";
import { Warning } from "@/global/components/Warning";
import Button from "@/global/components/Button";
import FormHeader from "@/global/components/FormHeader";

import { useUpdatePassword } from "../hooks/useUpdatePassword"; 


export type UpdatePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdatePasswordFormProps = {
  className?: string;
};

export default function UpdatePasswordForm({ className }: UpdatePasswordFormProps) {
  const { register, handleSubmit, formState, getValues } =
    useForm<UpdatePasswordFormData>();
    
  const { execute, warning, isLoading, setWarning, emptyWarningState } = useUpdatePassword();

  return (
    <>
      {warning.message !== "" && (
        <Warning
          message={warning.message}
          type={warning.type}
          onClose={() => {
            setWarning(emptyWarningState);

          }}
        />
      )}
      <form
        onSubmit={handleSubmit(execute)}
        className={`form ${className}`}
      >
        <FormHeader title="Update Password" subTitle="Choose a new, strong password for your account."/>
        
        <Input
          title="Current Password"
          type="password"
          placeholder="Enter your current password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          errorMessage={formState.errors.currentPassword?.message}
        />

        <Input
          title="New Password"
          type="password"
          placeholder="Create a new password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          errorMessage={formState.errors.newPassword?.message}
        />

        <Input
          title="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          {...register("confirmNewPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === getValues("newPassword") || "The new passwords do not match",
          })}
          errorMessage={formState.errors.confirmNewPassword?.message}
        />

        <Button title="Update Password" type="submit" disabled={isLoading} />
      </form>
    </>
  );
}