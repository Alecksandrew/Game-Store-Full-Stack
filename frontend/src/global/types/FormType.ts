import type { ReactNode } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  id?:string;
  submitText?: string;
  isLoading?: boolean;
  defaultValues?: T;
  className?:string,
};