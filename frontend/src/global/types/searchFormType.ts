import type { FieldValues, SubmitHandler } from "react-hook-form";

export type SearchFormProps<T extends FieldValues> = {
    onSubmit: SubmitHandler<T>;
    label?: string;
    placeholder?: string;
    buttonTitle?: string;
    className?: string;
  };


export type SearchFormData = {
  gameName: string;
};