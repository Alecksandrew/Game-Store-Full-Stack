import { useFormContext } from "react-hook-form";
import Form from "@/global/components/Form";
import { Input } from "@/global/components/Input";
import FormHeader from "@/global/components/Form/CompoundComponents/FormHeader";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { type UpdatePasswordFormData } from "../types/UpdatePasswordFormType";

export default function UpdatePasswordForm() {

  const { execute, isLoading, warningComponent } = useUpdatePassword();

  const ConfirmNewPasswordField = () => {
    const { getValues } = useFormContext();
    return (
      <Input
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm your new password"
        rules={{
          required: "Please confirm your new password",
          validate: (value) =>
            value === getValues("newPassword") || "The new passwords do not match",
        }}
      />
    );
  };

  return (
    <>
      {warningComponent}
      <Form<UpdatePasswordFormData>
        onSubmit={execute}
        submitText="Update Password"
        isLoading={isLoading}
      >
        <FormHeader title="Update Password" subTitle="Choose a new, strong password for your account."/>
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Enter your current password"
          rules={{
            required: "Current password is required",
          }}
        />
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Create a new password"
          rules={{
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        <ConfirmNewPasswordField />
      </Form>
    </>
  );
}