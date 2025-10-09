
import { Input } from "@/global/components/Input";
import { type SearchGameFormProps } from "../types/SearchGameFormType";
import { Form } from "@/global/components/Form/index";

export default function SearchGameForm({ onSubmit, className }: SearchGameFormProps) {
  return (
    <div className="bg-bg-secondary outline-2 outline-primary rounded w-full p-4 mx-auto">
      <Form.Root onSubmit={onSubmit} className={className}>
        <Form.Content>
          <Input label="Search Games" name="gameName" type="text" />
        </Form.Content>
        <Form.Actions>
          <Form.Button title="Search games" type="submit" />
        </Form.Actions>
      </Form.Root>
    </div>
  );
}
