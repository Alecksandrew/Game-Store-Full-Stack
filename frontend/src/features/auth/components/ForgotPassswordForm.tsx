import FormHeader from "@/global/components/Form/components/FormHeader";
import { Input } from "@/global/components/Input/Input";
import { type ForgotPassswordFormProps } from "../types/ForgotPasswordFormType";
import { useForgotPassword } from "../hooks/useAuth";
import Form from "@/global/components/Form";

export default function ForgotPasswordForm({
  className,
}: ForgotPassswordFormProps) {
  const { execute, isLoading, warningComponent } = useForgotPassword();

  return (
    <>
      {warningComponent}

      <Form
        onSubmit={execute}
        submitText="Reset password"
        isLoading={isLoading}
      >
        <FormHeader
          title="Forgot your password?"
          subTitle="Dont worry! Type your email and we gonna send a link to update your password!"
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
      </Form>
    </>
  );
}
