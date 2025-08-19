import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { BACKEND_URL } from "../../../BACKEND_URL";

export default function RegisterForm() {
  const { register, handleSubmit, formState, getValues } = useForm();

  function onSubmit(data) {
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 bg-bg-secondary max-w-[450px] rounded"
    >
      <div className="text-text-primary text-center mb-4">
        <h1 className="font-orbitron font-semibold text-4xl">Create account</h1>
        <p className="font-inter font-light">Sign up to start your gaming journey</p>
      </div>
      <Input
        title="User Name"
        type="text"
        placeholder="Enter your nickname"
        {...register("username", { required: "User name is required" })}
        errorMessage={formState.errors.username?.message as string}
      />
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
        errorMessage={formState.errors.email?.message as string}
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
        errorMessage={formState.errors.password?.message as string}
      />
      <Input
        title="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "The passwords do not match",
        })}
        errorMessage={formState.errors.confirmPassword?.message as string}
      />
      <button
        type="submit"
        className="bg-primary text-text-primary font-semibold p-1 rounded w-full mt-2"
      >
        Create account
      </button>
    </form>
  );
}
