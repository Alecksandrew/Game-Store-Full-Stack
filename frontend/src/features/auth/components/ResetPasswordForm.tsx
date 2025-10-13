import FormHeader from "@/global/components/Form/components/FormHeader";
import { Input } from "@/global/components/Input/Input";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useResetPassword } from "../hooks/useAuth";
import Form from "@/global/components/Form";
import { useFormContext } from "react-hook-form";

export default function ResetPasswordForm() {
  const { execute, isLoading, warningComponent, data } = useResetPassword();
  const location = useLocation();
  const navigate = useNavigate();

  //In order to pass hidden values to react hook form
  const defaultValues = useMemo(() => {
    const params = new URLSearchParams(location.search);
    console.log({
      token: params.get("token") || "",
      email: params.get("email") || "",
      newPassword: "",
      confirmNewPassword: "",
    })
    return {
      token: params.get("token") || "",
      email: params.get("email") || "",
      newPassword: "",
      confirmNewPassword: "",
    };
    
  }, [location.search]);

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [data, navigate]);


  //It is better i use useFormContext again to get a new function, because most of
  //other forms, dont use getValues
  const ConfirmNewPasswordInput = () => {
    const { getValues } = useFormContext();
    return (
      <Input
        label="Confirm new password"
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm your new password"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("newPassword") ||
            "The new passwords do not match",
        }}
      />
    );
  };

  const HiddenFields = () => {
    const { register } = useFormContext();
    return (
      <>
        <input type="hidden" {...register("token")} />
        <input type="hidden" {...register("email")} />
      </>
    )
  }

  return (
    <>
      {warningComponent}
      <Form
        onSubmit={execute}
        submitText="Reset password"
        isLoading={isLoading}
        defaultValues={defaultValues}
      >
        <FormHeader
          title="Update your password"
          subTitle="Set a new password and get back to enjoy daily game deals"
        />
        <HiddenFields />
        <Input
          label="New password"
          name="newPassword"
          type="password"
          placeholder="Create a password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        <ConfirmNewPasswordInput />
      </Form>
    </>
  );
}
