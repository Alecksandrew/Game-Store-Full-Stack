import { AUTH_URL } from "../../../BACKEND_URL";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import { Input } from "../../../components/Input"
import { useForm } from "react-hook-form";


export default function ForgotPasswordForm({className}){
    const { register, handleSubmit, formState } = useForm<LoginFormData>();

    

    return (
        <form onSubmit={handleSubmit} className={`form ${className}`}>
          <FormHeader title="Forgot your password?" subTitle="Dont worry! Type your email and we gonna send a link to update your password!"/>
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
              <Button title="Reset password" type="submit"/>
        </form>
    )
}