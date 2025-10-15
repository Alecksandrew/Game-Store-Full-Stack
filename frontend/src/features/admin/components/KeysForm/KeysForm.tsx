
import { Form } from "@/global/components/Form/Form";
import { TextArea } from "@/global/components/TextArea/TextArea";
import { useAddKeys } from "../../hooks/useAdminGameActions";
import { Button } from "@/global/components/Button";

type KeysFormProps = {
  gameId: number;
  gameName: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function KeysForm({ gameId, gameName, onSuccess, onCancel }: KeysFormProps) {
  const { execute: addKeys, isLoading, warningComponent } = useAddKeys(gameId);

  const handleSubmit = async (data: { Keys: string }) => {
    try {

      const keysArray = data.Keys
        .split(',')
        .map(key => key.trim())
        .filter(key => key.length > 0);

      if (keysArray.length === 0) {
        console.error("Nenhuma chave válida fornecida");
        return;
      }

      await addKeys({ keys: keysArray });
      onSuccess();
    } catch (error) {
      console.error("Erro ao adicionar chaves:", error);
    }
  };

  return (
    <>
      {warningComponent}
      <Form.Root onSubmit={handleSubmit}>
        <Form.Header title={`Add keys to ${gameName}`} subtitle="Keys must follow the format: FAKE-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" />
        <Form.Body>
          <TextArea 
            name="Keys" 
            placeholder="Paste all keys here, separated by colons: key1, key2, key3..."
            required
          />
        </Form.Body>
        <Form.Actions>
          <Button 
            type="button" 
            onClick={onCancel}
            className="bg-gray-500"
          >Cancel</Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >{isLoading ? "Adding..." : "Add keys"}</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}