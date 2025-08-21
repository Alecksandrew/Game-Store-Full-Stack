import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import { Warning } from "../../../components/Warning";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";

import { type ForgotPassswordFormProps } from "../types/ForgotPasswordFormType";
import { type ForgotPassswordFormData } from "../types/ForgotPasswordFormType";
import { useForgotPassword } from "../hooks/useAuth";


export default function ForgotPasswordForm({ className }:ForgotPassswordFormProps) {
  const { register, handleSubmit, formState } =
    useForm<ForgotPassswordFormData>();
  const { execute, warning, isLoading, setWarning, emptyWarningState } = useForgotPassword();

  return (
    <>
      {warning.message !== "" ? (
        <Warning
          message={warning.message}
          type={warning.type}
          onClose={() => setWarning(emptyWarningState)}
        />
      ) : null}
      <form onSubmit={handleSubmit(execute)} className={`form ${className}`}>
        <FormHeader
          title="Forgot your password?"
          subTitle="Dont worry! Type your email and we gonna send a link to update your password!"
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
        <Button title="Reset password" type="submit" disabled={isLoading} />
      </form>
    </>
  );
}
