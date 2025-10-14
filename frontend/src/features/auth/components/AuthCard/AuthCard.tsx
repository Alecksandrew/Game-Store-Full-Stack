import { Card } from "@/global/components/Card"; // Importa o Card genérico
import type { AuthCardProps } from "./types";
import { twMerge } from "tailwind-merge";

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={twMerge("flex flex-col justify-center relative z-10 min-w-[325px] w-1/2 max-w-[600px] border-primary p-6", className)}>
      {children}
    </Card>
  );
}
