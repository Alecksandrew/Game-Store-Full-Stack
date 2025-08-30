import { useFormContext } from 'react-hook-form';
import type { TextAreaProps } from '../types/textAreaType';


export const TextArea = (
  ({ label, name, rules, icon, ...props }:TextAreaProps) => {

    const { register, formState: { errors } } = useFormContext();
    const fieldError = errors[name];

    return (
      <label htmlFor={name} className=" flex flex-col gap-0.5 w-full">
        <span className="font-inter font-bold text-text-primary md:text-lg">{label}</span>
        <div 
          className={`
            bg-bg-primary rounded flex items-center p-1 placeholder:text-text-secondary text-text-primary ring-text-secondary ring-1
            ${fieldError
              ? 'border-danger ring-2 ring-danger' 
              : 'border-border focus-within:ring-2 focus-within:ring-primary' 
            }
          `}
        >
          {icon}
          <textarea
            id={name}
            {...register(name, rules)}
            {...props}
            className="w-full bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
        {fieldError && (
          <span className="text-red-500 text-sm">{fieldError.message as string}</span>
        )}
      </label>
    );
  }
);