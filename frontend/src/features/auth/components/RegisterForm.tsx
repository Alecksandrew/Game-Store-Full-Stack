import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { BACKEND_URL } from "../../../BACKEND_URL";
import { Warning } from "../../../components/Warning";

import { type errorResponseApi } from "../../../types/responseApiType";
import { type RegisterFormData } from "../types/RegisterFormType";
import { useState } from "react";

type warningState = {
  message: string;
  type: "success" | "error";
};

const emptyWarningState:warningState = {
  message: "",
  type: "success",
};

export default function RegisterForm() {
  const { register, handleSubmit, formState, getValues } =
    useForm<RegisterFormData>();
  const [warning, setWarning] = useState<warningState>(emptyWarningState);

  async function createAccount(formData: RegisterFormData) {
    const response = await fetch(`${BACKEND_URL}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      let errorMessage =
        responseData.message || "An unexpected error occurred.";

      if (responseData.errors) {
        errorMessage = responseData.errors
          .map((err: errorResponseApi) => err.description)
          .join("\n");
      } else if (responseData.message) {
        errorMessage = responseData.message;
      }

      throw new Error(errorMessage);
    }

    return responseData.message;
  }

  async function onSubmit(data: RegisterFormData) {
    console.log(data);
    try {
      const successMessage = await createAccount(data);
      const successObj: warningState = {
        message: successMessage,
        type: "success",
      };
      setWarning(successObj);
    } catch (error) {
      const errorObj: warningState = {
        message: "",
        type: "error",
      };

      if (error instanceof Error) {
        const errorMessage = error?.message;
        errorObj.message = errorMessage;
        setWarning(errorObj);
      } else {
        errorObj.message = "An unknown error occurred."
        setWarning(errorObj); 
      }
    }
  }

  return (
    <>
     {warning.message !== "" ? <Warning message={warning.message} type={warning.type} onClose={() =>setWarning(emptyWarningState)}/> : null
     }
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-bg-secondary max-w-[450px] rounded"
      >
        <div className="text-text-primary text-center mb-4">
          <h1 className="font-orbitron font-semibold text-4xl">
            Create account
          </h1>
          <p className="font-inter font-light">
            Sign up to start your gaming journey
          </p>
        </div>
        <Input
          title="User Name"
          type="text"
          placeholder="Enter your nickname"
          {...register("username", { required: "User name is required" })}
          errorMessage={formState.errors.username?.message}
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
        <Input
          title="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          errorMessage={formState.errors.confirmPassword?.message}
        />
        <button
          type="submit"
          className="bg-primary text-text-primary font-semibold p-1 rounded w-full mt-2"
        >
          Create account
        </button>
      </form>
    </>
  );
}
