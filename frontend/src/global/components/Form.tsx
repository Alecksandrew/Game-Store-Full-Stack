import { useForm, FormProvider, type FieldValues} from 'react-hook-form';
import { type FormProps } from '../types/FormType';
import Button from './Button';



export default function Form<T extends FieldValues>({
  onSubmit,
  children,
  submitText,
  isLoading = false,
  defaultValues
}: FormProps<T>) {

  const methods = useForm<T>(defaultValues);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {children}
        </div>
        <div className="mt-6">
          <Button
            title={submitText}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}