import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { Warning } from "../../../components/Warning";
import Button from "../../../components/Button";
import { useAuthForm } from "../hooks/useAuth";

import { type LoginFormData } from "../types/LoginFormType";
import { type LoginFormProps } from "../types/LoginFormType";

export default function LoginForm({ className }: LoginFormProps) {
  const { register, handleSubmit, formState } = useForm<LoginFormData>();

  const { warning, onSubmit, emptyWarningState, setWarning } =
    useAuthForm<LoginFormData>("/login");

  return (
    <>
      {warning.message !== "" ? (
        <Warning
          message={warning.message}
          type={warning.type}
          onClose={() => setWarning(emptyWarningState)}
        />
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col justify-center items-center gap-4 p-6 
        bg-bg-secondary aspect-[10/12] 
        max-h-[600px] rounded border-1 border-primary w-full ${className}`}
      >
        <div className="text-text-primary text-center mb-4">
          <h1 className="font-orbitron font-semibold text-4xl lg:text-5xl">
            Login
          </h1>
          <p className="font-inter font-light lg:text-2xl">
            Login to start your gaming journey
          </p>
        </div>
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
        <Button title="Login" type="submit" />
      </form>
    </>
  );
}
