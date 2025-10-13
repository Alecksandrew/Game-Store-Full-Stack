
import clsx from 'clsx';
import { Button } from '@/global/components/Button/Button'; 
import type { ToggleProps } from './types';


export default function Toggle<T extends string>({
  options,
  activedOption,
  onOptionChange,
}: ToggleProps<T>) {
  return (

    <div className="flex">
      {options.map((option) => (
        <Button
          key={option.id}
          type="button" 
          className={clsx('bg-primary', {
            'opacity-50': activedOption !== option.id,
          })}
          onClick={() => onOptionChange(option.id)}
        >{option.title}</Button>
      ))}
    </div>
  );
}