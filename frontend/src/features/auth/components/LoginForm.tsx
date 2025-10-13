import { Input } from "@/global/components/Input/Input";
import { useLogin } from "../hooks/useAuth";
import { type LoginFormData } from "../types/LoginFormType";
import { Link} from "react-router";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { Button } from "@/global/components/Button";
import { Form } from "@/global/components/Form";


export default function LoginForm() {
  const { execute, isLoading, warningComponent } = useLogin();

  return (
    <>
      {warningComponent}
      <Form.Root<LoginFormData>
        onSubmit={execute}
      >
        <Form.Header
          title="Login"
          subtitle="Login to start your gaming journey"
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
        </Form.Body>

        <Form.Actions>
          <Button
            type="submit"
            disabled={isLoading}
          >Login</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}
