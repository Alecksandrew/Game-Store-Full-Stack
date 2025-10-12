// src/global/components/SearchForm.tsx
import { twMerge } from "tailwind-merge";
import type { SearchFormProps } from "../types/searchFormType";
import { Form } from "./Form/index";
import { Input } from "./Input/Input";


export function SearchForm({
  onSubmit,
  label,
  placeholder = "Search for a game",
  buttonTitle = "Search games",
  className,
}: SearchFormProps) {

  
    return (    
    <Form.Root onSubmit={onSubmit} className={twMerge("flex gap-4 mb-4", className)}>
      <Form.Content className="w-full">
        <Input 
          name="gameName" 
          type="text" 
          label={label ?? ""} // Need to be refactored later this component
          placeholder={placeholder} 
        />
      </Form.Content>
      <Form.Actions className="mt-0">
        <Form.Button
          title={buttonTitle}
          type="submit"
          className="whitespace-nowrap mt-0"
        />
      </Form.Actions>
    </Form.Root>
  );
}