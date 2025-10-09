import type { FormContentProps } from "@/global/types/FormTypes/formContentType";
import { twMerge } from "tailwind-merge";


export function FormContent({
  children,
  className,
  ...props
}: FormContentProps) {

  return (
    <div className={twMerge("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}