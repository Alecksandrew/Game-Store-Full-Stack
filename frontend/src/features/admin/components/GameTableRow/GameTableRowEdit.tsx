import { Form } from "@/global/components/Form/Form";
import { Input } from "@/global/components/Input/Input";
import { Table } from "@/global/components/Table/Table";
import type { AdminGame } from "../../types/gameDashboardTypes";
import { FaSave, FaTimes } from "react-icons/fa";

type GameTableRowEditProps = {
  gameInfo: AdminGame;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export default function GameTableRowEdit({ gameInfo, onSave, onCancel, isLoading }: GameTableRowEditProps) {
  return (
    <Form.Root onSubmit={onSave} defaultValues={gameInfo}>
      <Table.Row className="bg-primary/10">
        <Table.Td>{gameInfo.igdbId}</Table.Td>
        <Table.Td>{gameInfo.name}</Table.Td>
        <Table.Td>
          <Input
            name="price"
            type="number"
            step="0.01"
            className="p-1 rounded bg-bg-primary"
            rules={{ required: "Price is required" }}
          />
        </Table.Td>
        <Table.Td>
          <Input
            name="discountPrice"
            type="number"
            step="0.01"
            className="p-1 rounded bg-bg-primary"
            rules={{ required: "Discount price is required" }}
          />
        </Table.Td>
        <Table.Td>{gameInfo.availableKeys}</Table.Td>
        <Table.Td>
          <Form.Actions className="flex gap-4 mt-0">
            <Form.Button
              title={isLoading ? "Saving..." : "Save"}
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <FaSave />
            </Form.Button>
            <Form.Button
              title="Cancel"
              type="button"
              onClick={onCancel}
              className="bg-danger flex items-center gap-2"
            >
              <FaTimes />
            </Form.Button>
          </Form.Actions>
        </Table.Td>
      </Table.Row>
    </Form.Root>
  );
}