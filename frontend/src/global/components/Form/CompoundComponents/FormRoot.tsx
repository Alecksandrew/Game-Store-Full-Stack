import type { FormRootProps } from "@/global/types/FormTypes/formRootType";
import { useForm, FormProvider, type FieldValues, type SubmitHandler } from "react-hook-form";

export function FormRoot<T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  ...props 
}: FormRootProps<T>) {
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