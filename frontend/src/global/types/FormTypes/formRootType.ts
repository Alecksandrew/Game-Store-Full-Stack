import type { FormHTMLAttributes, ReactNode } from "react";
import type { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";

export interface FormRootProps<T extends FieldValues> 
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
}