import { Table } from "@/global/components/Table/Table";
import { FaEdit, FaKey } from "react-icons/fa";
import { Button } from "@/global/components/Button";
import type { GameTableRowDisplayProps } from "./types";

export default function GameTableRowDisplay({
  gameInfo,
  onEdit,
  onOpenKeysModal,
}: GameTableRowDisplayProps) {
  const { igdbId, name, price, discountPrice, availableKeys } = gameInfo;
  const actionClass = "cursor-pointer flex justify-center";

  return (
    <Table.Row className="border-t border-blue-gray">
      <Table.Td>{igdbId}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{price}</Table.Td>
      <Table.Td>{discountPrice}</Table.Td>
      <Table.Td>{availableKeys}</Table.Td>

      <Table.Td>
        <Table.Actions className="flex gap-6">
          <Button
            type="button"
            onClick={() => onEdit(igdbId)}
            className={actionClass}
            aria-label="Edit game"
          >
            <FaEdit />
          </Button>
          <Button
            type="button"
            onClick={() => onOpenKeysModal?.(igdbId, name)}
            className={actionClass}
            title="Adicionar chaves"
          >
            <FaKey />
          </Button>
        </Table.Actions>
      </Table.Td>
    </Table.Row>
  );
}
