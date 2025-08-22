import type { InputHTMLAttributes, ReactElement } from "react";

export interface inputOnlyDisplayInfoProps
  extends InputHTMLAttributes<HTMLInputElement> {
  title?:string,
  inputValue: string;
  icon?: ReactElement;
  errorMessage?: string;
}

export default function InputOnlyDisplayInfo({
    title,
    inputValue,
    icon,
  ...props
}: inputOnlyDisplayInfoProps) {
  return (
    <label className=" flex flex-col gap-0.5 w-full">
      <span className="font-inter font-bold text-text-primary md:text-lg">
        {title}
      </span>
      <div
        className={`
            bg-bg-primary rounded flex items-center p-1 placeholder:text-text-secondary text-text-primary ring-text-secondary ring-1
border-border focus-within:ring-2 focus-within:ring-primary 

          `}
      >
        {icon}
        <input
          {...props}
          className="w-full bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
          disabled={true}
          value={inputValue}
        />
      </div>
    </label>
  );
}
