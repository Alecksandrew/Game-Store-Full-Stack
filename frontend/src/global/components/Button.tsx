import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button";
  className?: string;
  title: string;
}

export default function Button({
  className = "bg-primary",
  title,
  type,
  ...props
}: ButtonProps) {

  return (
    <button type={type} className={`text-text-primary font-semibold p-1 rounded w-full mt-2 ${className}`} {...props}>
      {title}
    </button>
  );
}
