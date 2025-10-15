export type ToggleOption<T extends string> = {
    id: T;
    title: string;
  };
  
export type ToggleProps<T extends string> = {
    options: readonly ToggleOption<T>[];
    activedOption: T;
    onOptionChange: (option: T) => void;

  };