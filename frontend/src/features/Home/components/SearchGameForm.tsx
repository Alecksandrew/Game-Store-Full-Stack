import Form from "@/global/components/Form";
import { Input } from "@/global/components/Input";
import { type SearchGameFormProps } from "../types/SearchGameFormType";
import { twMerge } from "tailwind-merge";

export default function SearchGameForm({ onSubmit, className }: SearchGameFormProps) {
  return (
    <div className="bg-bg-secondary outline-2 outline-primary rounded w-full p-4 mx-auto">
      <Form submitText="Search games" onSubmit={onSubmit} className={twMerge(`flex flex-col ${className}`)}>
        <Input label="Search Games" name="gameName" />
      </Form>
    </div>
  );
}
