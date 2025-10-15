import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "button";
    className?: string;
    children: ReactNode;
  }
  