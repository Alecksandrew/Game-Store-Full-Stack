import { useState } from "react";
import { Form } from "@/global/components/Form/Form";
import { TextArea } from "@/global/components/TextArea/TextArea";
import { Button } from "@/global/components/Button";
import type { KeysFormProps } from "./types";

export default function KeysForm({
  gameName,
  isLoading = false,
  warningComponent,
  onSubmit,
  onCancel,
}: KeysFormProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (data: { Keys: string }) => {
    setLocalError(null);

    const keysArray = data.Keys.split(",")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);

    if (keysArray.length === 0) {
      setLocalError("Please enter at least one valid key.");
      return;
    }

    await onSubmit(keysArray);
  };

  return (
    <>
      {warningComponent}

      {localError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
          {localError}
        </div>
      )}

      <Form.Root onSubmit={handleSubmit}>
        <Form.Header
          title={`Add keys to ${gameName}`}
          subtitle="Keys must follow the format: FAKE-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        />
        <Form.Body>
          <TextArea
            name="Keys"
            placeholder="Paste all keys here, separated by colons: key1, key2, key3..."
            required
            className="min-h-[150px]"
          />
        </Form.Body>
        <Form.Actions>
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add keys"}
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}
