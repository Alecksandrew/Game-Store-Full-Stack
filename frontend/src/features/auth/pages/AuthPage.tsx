import { useState } from "react";

import FormWrapper from "../components/FormWrapper";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Toggle from "../../../global/components/Toggle";

export default function AuthPage() {
  const [toggleState, setToggleState] = useState<"login" | "register">(
    "register"
  );

  return (
    <FormWrapper>
      <Toggle activeOption={toggleState} onOptionChange={setToggleState} />
      {toggleState === "register" ? <RegisterForm /> : <LoginForm />}
    </FormWrapper>
  );
}
