import { Input } from "@/global/components/Input";
import { useLogin } from "../hooks/useAuth";
import FormHeader from "@/global/components/FormHeader";

import { type LoginFormData } from "../types/LoginFormType";
import { type LoginFormProps } from "../types/LoginFormType";
import { Link } from "react-router";
import Form from "@/global/components/Form";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

export default function LoginForm({ className }: LoginFormProps) {
  const { execute, isLoading, warningComponent } = useLogin();

  return (
    <>
      {warningComponent}
      <Form<LoginFormData>
        onSubmit={execute}
        submitText="Login"
        isLoading={isLoading}
      >
        <FormHeader
          title="Login"
          subTitle="Login to start your gaming journey"
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
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          placeholder="Create a password"
        />
        <Link
          to={PAGE_ROUTES.AUTH.FORGOT_PASSWORD}
          className="text-text-primary underline decoration-2 decoration-primary font-inter font-light text-sm mt-2"
        >
          Forgot password
        </Link>
      </Form>
    </>
  );
}
