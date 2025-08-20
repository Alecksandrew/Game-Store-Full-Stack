import { useState } from "react";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Toggle from "../../../components/Toggle";

export default function AuthPage() {
  const [toggleState, setToggleState] = useState<"login" | "register">(
    "register"
  );

  return (
    <div className="relative bg-bg-primary h-screen w-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale-100 bg-[url('../../../../public/the-witcher-3-bg.jpg')] blur-[2px]" />
      {/* Conteúdo */}
      <div className="relative z-10 min-w-[325px] w-1/2 max-w-[600px]">
        <Toggle activeOption={toggleState} onOptionChange={setToggleState} />
        {toggleState === "register" ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
