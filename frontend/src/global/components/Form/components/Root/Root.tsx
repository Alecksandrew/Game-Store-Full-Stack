
import { useForm, FormProvider, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { RootProps } from "./types";

export function Root<T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  ...props 
}: RootProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(onSubmit  as SubmitHandler<FieldValues>)} 
        {...props} 
      >
        {children}
      </form>
    </FormProvider>
  );
}