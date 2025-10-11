//INPUT WITHOUT REACT HOOK FORM
import { type InputProps } from "@/global/types/inputType";

export const SimpleInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  icon, 
  className = "",
  ...props 
}: InputProps & {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-0.5 w-full">
      {label && (
        <span className="font-inter font-bold text-text-primary md:text-lg">
          {label}
        </span>
      )}
      <div 
        className={`
          bg-bg-primary rounded flex items-center p-1 placeholder:text-text-secondary text-text-primary ring-text-secondary ring-1
          border-border focus-within:ring-2 focus-within:ring-primary
          ${className}
        `}
      >
        {icon}
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
          className="w-full bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>
    </label>
  );
};