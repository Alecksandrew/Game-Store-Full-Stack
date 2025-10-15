import { useFormContext } from "react-hook-form";
import { Input } from "@/global/components/Input/Input";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { type UpdatePasswordFormData } from "../types/UpdatePasswordFormType";
import { Button } from "@/global/components/Button";
import { Form } from "@/global/components/Form";

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
      <Form.Root<UpdatePasswordFormData>
        onSubmit={execute}
      >
        <Form.Header 
          title="Update Password" 
          subtitle="Choose a new, strong password for your account."
        />
        
        <Form.Body>
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
        </Form.Body>

        <Form.Actions>
          <Button
            type="submit"
            disabled={isLoading}
          >Update Password</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}