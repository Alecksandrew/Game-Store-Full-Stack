import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "button";
    className?: string;
    title: string;
  }
  