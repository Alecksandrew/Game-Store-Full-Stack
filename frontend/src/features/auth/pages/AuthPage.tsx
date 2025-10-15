import { useState } from "react";
import Toggle from "@/global/components/Toggle/Toggle";
import type { ToggleOption } from "@/global/components/Toggle";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { AuthCard } from "../components/AuthCard";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("register");

  const authOptions: ToggleOption<AuthMode>[] = [
    { id: "login", title: "Log in" },
    { id: "register", title: "Register" },
  ];

  return (
    <AuthCard className="gap-6">
      <Toggle
        options={authOptions}
        activedOption={mode}
        onOptionChange={setMode}
      />
      {mode === "register" ? <RegisterForm /> : <LoginForm />}
    </AuthCard>
  );
}