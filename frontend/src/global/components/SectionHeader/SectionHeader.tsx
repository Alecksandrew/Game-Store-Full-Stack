import { twMerge } from 'tailwind-merge';
import type { SectionHeaderProps } from './SectionHeaderTypes';


const SectionHeader = ({
  title,
  subtitle,
  headingLevel = "h1",
  className,
  titleClassName,
  subtitleClassName
}:SectionHeaderProps) => {

  const HeadingComponent = headingLevel;
  
  return (
    <div className={twMerge("mb-6",className)}>
      <HeadingComponent  className={twMerge("text-text-primary font-semibold text-4xl md:text-5xl mb-2", titleClassName)}>
        {title}
      </HeadingComponent>
      {subtitle && (
        <p className={twMerge("text-blue-gray text-xl md:text-3xl", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;