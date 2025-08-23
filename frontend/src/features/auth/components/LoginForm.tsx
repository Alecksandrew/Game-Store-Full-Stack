import { useForm } from "react-hook-form";
import { Input } from "@/global/components/Input";
import Button from "@/global/components/Button";
import { useLogin } from "../hooks/useAuth";
import FormHeader from "@/global/components/FormHeader";

import { type LoginFormData } from "../types/LoginFormType";
import { type LoginFormProps } from "../types/LoginFormType";
import { Link } from "react-router";

export default function LoginForm({ className }: LoginFormProps) {
  const { register, handleSubmit, formState } = useForm<LoginFormData>();

   const { execute, isLoading, warningComponent } = useLogin();

  return (
    <>
      {warningComponent}
      <form
        onSubmit={handleSubmit(execute)}
        className={`form ${className}`}
      >
        <FormHeader title="Login" subTitle="Login to start your gaming journey"/>
        <Input
          title="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
          errorMessage={formState.errors.email?.message}
        />
        <Input
          title="Password"
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
        <Button title="Login" type="submit" disabled={isLoading}/>
        <Link to={"/forgot-password"} className="text-text-primary underline decoration-2 decoration-primary font-inter font-light text-sm mt-2">Forgot password</Link>
      </form>
      
    </>
  );
}
