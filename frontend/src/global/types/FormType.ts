import type { ReactNode } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  submitText: string;
  isLoading?: boolean;
  defaultValues?: T;
};