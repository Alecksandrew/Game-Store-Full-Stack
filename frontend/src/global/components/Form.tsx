import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { type FormProps } from "../types/FormType";
import Button from "./Button";

export default function Form<T extends FieldValues>({
  onSubmit,
  children,
  id,
  submitText,
  isLoading = false,
  defaultValues,
  className
}: FormProps<T>) {
  const methods = useForm<T>({ defaultValues: defaultValues });

  function renderButton() {
    if (submitText == undefined || submitText == "") return;

    return <Button title={submitText} type="submit" disabled={isLoading} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id} className={className}>
        <div className="space-y-4">{children}</div>
        {renderButton() && <div className="mt-6">{renderButton()}</div>}
      </form>
    </FormProvider>
  );
}
