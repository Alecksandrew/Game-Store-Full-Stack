// src/global/components/SearchForm.tsx
import { twMerge } from "tailwind-merge";
import type { SearchFormProps } from "./types";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { Button } from "../Button";


export function SearchForm({
  onSubmit,
  label,
  placeholder = "Search for a game",
  buttonTitle = "Search games",
  className,
}: SearchFormProps) {

  
    return (    
    <Form.Root onSubmit={onSubmit} className={twMerge("flex gap-4 mb-4", className)}>
      <Form.Body className="w-full">
        <Input 
          name="gameName" 
          type="text" 
          label={label ?? ""} // Need to be refactored later this component
          placeholder={placeholder} 
        />
      </Form.Body>
      <Form.Actions className="mt-0">
        <Button
          title={buttonTitle}
          type="submit"
          className="whitespace-nowrap mt-0"
        />
      </Form.Actions>
    </Form.Root>
  );
}