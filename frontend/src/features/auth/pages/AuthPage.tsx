import { useState } from "react";

import BackgroundPage from "@/global/components/BackgroundPage";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Toggle from "../../../global/components/Toggle";
import Card from "@/global/components/Card";

export default function AuthPage() {
  const [toggleState, setToggleState] = useState<"login" | "register">(
    "register"
  );

  return (
      <Card className="gap-6">
        <Toggle activeOption={toggleState} onOptionChange={setToggleState} />
        {toggleState === "register" ? <RegisterForm /> : <LoginForm />}
      </Card>
  );
}
