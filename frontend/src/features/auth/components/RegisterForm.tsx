import { useForm, useFormContext } from "react-hook-form";
import { Input } from "@/global/components/Input/Input";
import Button from "@/global/components/Button/Button";
import { useRegister } from "../hooks/useAuth";

import { type RegisterFormProps } from "../types/RegisterFormType";
import { type RegisterFormData } from "../types/RegisterFormType";
import FormHeader from "@/global/components/Form/CompoundComponents/FormHeader";
import Form from "@/global/components/Form";

export default function RegisterForm({ className }: RegisterFormProps) {
  const { execute, isLoading, warningComponent } = useRegister();

  const ConfirmPasswordField = () => {
    const { getValues } = useFormContext();
    return (
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "The passwords do not match",
        }}
      />
    );
  };
  return (
    <>
      {warningComponent}
      <Form<RegisterFormData>
        onSubmit={execute}
        submitText="Create account"
        isLoading={isLoading}
      >
        <FormHeader
          title="Create account"
          subTitle="Sign up to start your gaming journey"
        />
        <Input
          label="User Name"
          name="username"
          type="text"
          placeholder="Enter your nickname"
          rules={{ required: "User name is required" }}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          }}
        />
        <Input
          label="Password"
          name="password"
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
        <ConfirmPasswordField />
      </Form>
    </>
  );
}
