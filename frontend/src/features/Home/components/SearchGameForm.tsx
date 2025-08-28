import Form from "@/global/components/Form";
import { Input } from "@/global/components/Input";
import { type SearchGameFormProps } from "../types/SearchGameFormType";

export default function SearchGameForm({ onSubmit }: SearchGameFormProps) {
  return (
    <div className="bg-bg-secondary outline-2 outline-primary rounded min-w-[320px] w-full p-4 mx-auto">
      <Form submitText="Search games" onSubmit={onSubmit}>
        <Input label="Search Games" name="gameName" />
      </Form>
    </div>
  );
}
