import type { DisplayFieldProps } from "./types";
import { twMerge } from "tailwind-merge";

export function DisplayField({
  title,
  value,
  icon,
  className,
}: DisplayFieldProps) {
  return (
    <div className={twMerge("flex flex-col gap-0.5 w-full", className)}>
      {title && (
        <span className="font-inter font-bold text-text-primary md:text-lg">
          {title}
        </span>
      )}

      <div
        className={`
          bg-bg-primary rounded flex items-center p-1 text-text-primary 
          ring-text-secondary ring-1 border-border
        `}
      >
        {icon}
        <p className="w-full bg-transparent text-text-primary px-2 py-1.5">
          {value}
        </p>
      </div>
    </div>
  );
}
