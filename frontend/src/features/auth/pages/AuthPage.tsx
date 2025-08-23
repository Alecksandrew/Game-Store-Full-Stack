import { useState } from "react";

import FormWrapper from "../components/FormWrapper";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Toggle from "../../../global/components/Toggle";
import Card from "@/global/components/Card";

export default function AuthPage() {
  const [toggleState, setToggleState] = useState<"login" | "register">(
    "register"
  );

  return (
    <>
        <Card>
          {toggleState === "register" ? <RegisterForm /> : <LoginForm />}
        </Card>
        <FormWrapper>
      <Toggle activeOption={toggleState} onOptionChange={setToggleState} />
    </FormWrapper>
        </>
    
  );
}
