import { twMerge } from "tailwind-merge";
import type { HeaderProps } from "./types";

export default function FormHeader({
  title,
  subtitle,
  divClassName,
  titleClassName,
  subtitleClassName
}: HeaderProps) {
  return (
    <div className={twMerge("text-text-primary text-center mb-6", divClassName)}>
      <h1 className={twMerge("font-orbitron font-semibold text-4xl lg:text-5xl mb-1", titleClassName)}>
        {title}
      </h1>
      {subtitle && (
        <p className={twMerge("font-inter font-light lg:text-xl", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}