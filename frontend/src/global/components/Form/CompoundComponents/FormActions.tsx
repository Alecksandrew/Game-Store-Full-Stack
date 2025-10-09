import type { FormActionsProps } from "@/global/types/FormTypes/formActionsType";
import { twMerge } from "tailwind-merge";


export function FormActions({
  children,
  className,
  ...props
}: FormActionsProps) {
  
  return (
    <div className={twMerge(
      "flex gap-3 mt-6",
      className
    )}
    {...props}>
      {children}
    </div>
  );
}