import { Input } from "@/global/components/Input/Input";
import { Table } from "@/global/components/Table/Table";
import { FaSave, FaTimes } from "react-icons/fa";
import { Button } from "@/global/components/Button";
import { useForm, FormProvider } from "react-hook-form";
import type { GameTableRowEditProps } from "./types";

export default function GameTableRowEdit({
  gameInfo,
  onSave,
  onCancel,
  isLoading,
}: GameTableRowEditProps) {
  const methods = useForm({
    defaultValues: gameInfo,
  });

  return (
    <FormProvider {...methods}>
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
          <div className="flex gap-4 mt-0">
            <Button
              title={isLoading ? "Saving..." : "Save"}
              type="button"
              onClick={methods.handleSubmit(onSave)}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <FaSave />
            </Button>
            <Button
              title="Cancel"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="bg-danger flex items-center gap-2"
            >
              <FaTimes />
            </Button>
          </div>
        </Table.Td>
      </Table.Row>
    </FormProvider>
  );
}
