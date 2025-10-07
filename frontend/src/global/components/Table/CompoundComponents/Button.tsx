import type { ButtonProps } from "@/global/types/TableTypes/buttonType";

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
