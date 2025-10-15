import {  useFormContext } from "react-hook-form";


import { useRegister } from "../hooks/useAuth";

import { type RegisterFormProps } from "../types/RegisterFormType";
import { type RegisterFormData } from "../types/RegisterFormType";
import { Form } from "@/global/components/Form";
import { Button } from "@/global/components/Button";
import { Input } from "@/global/components/Input";

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
      <Form.Root<RegisterFormData>
        onSubmit={execute}
        className={className}
      >
        <Form.Header
          title="Create account"
          subtitle="Sign up to start your gaming journey"
        />
        
        <Form.Body>
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
        </Form.Body>

        <Form.Actions>
          <Button
            type="submit"
            disabled={isLoading}
          >Create account</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}
