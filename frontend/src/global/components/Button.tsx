import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button";
  className?: string;
  title: string;
}

export default function Button({
  className = "bg-primary text-text-primary",
  title,
  type,
  ...props
}: ButtonProps) {

  return (
    <button type={type} className={twMerge(`font-semibold p-0.5 sm:p-1 rounded w-full mt-2`, className)} {...props}>
      {title}
    </button>
  );
}
