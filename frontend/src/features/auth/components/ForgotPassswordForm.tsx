
import { Input } from "@/global/components/Input/Input";
import { type ForgotPassswordFormProps } from "../types/ForgotPasswordFormType";
import { useForgotPassword } from "../hooks/useAuth";
import { Form } from "@/global/components/Form";
import { Button } from "@/global/components/Button";


export default function ForgotPasswordForm({
  className,
}: ForgotPassswordFormProps) {
  const { execute, isLoading, warningComponent } = useForgotPassword();

  return (
    <>
      {warningComponent}

      <Form.Root onSubmit={execute} className={className}>
        <Form.Header
          title="Forgot your password?"
          subtitle="Dont worry! Type your email and we gonna send a link to update your password!"
        />
        
        <Form.Body>
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
        </Form.Body>

        <Form.Actions>
          <Button
            type="submit"
            disabled={isLoading}
          >Reset password</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}
