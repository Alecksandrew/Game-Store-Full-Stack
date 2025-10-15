import type { FieldValues, SubmitHandler } from "react-hook-form";

export type SearchFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    label?: string;
    placeholder?: string;
    buttonTitle?: string;
    className?: string;
  };