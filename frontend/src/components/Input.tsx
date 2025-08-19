
import { forwardRef } from "react";
import { type inputProps } from "../types/inputType";

export const Input = forwardRef<HTMLInputElement, inputProps>(
  ({ title, icon, errorMessage, ...props }, ref) => {

    const inputId = props.name || title;

    return (
      <label htmlFor={inputId} className=" flex flex-col gap-0.5">
        <span className="font-inter font-bold text-text-primary">{title}</span>
        <div 
          className={`
            bg-bg-primary rounded flex items-center p-1 placeholder:text-text-secondary text-text-primary ring-text-secondary ring-1
            ${errorMessage 
              ? 'border-danger ring-2 ring-danger' 
              : 'border-border focus-within:ring-2 focus-within:ring-primary' 
            }
          `}
        >
          {icon}
          <input
            id={inputId}
            ref={ref}
            {...props}
            className="w-full bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </label>
    );
  }
);