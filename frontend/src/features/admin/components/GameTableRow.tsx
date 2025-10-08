import { Table } from "@/global/components/Table/index";
import type { gameTableRowProps } from "../types/gameTableRowType";
import { FaEdit, FaKey, FaTrashAlt } from "react-icons/fa";



import Button from "@/global/components/Table/CompoundComponents/Button";

export default function GameTableRow({
  gameInfo,
}: {
  gameInfo: gameTableRowProps;
}) {
  const { igdbId, name, price, discountPrice, availableKeys } = gameInfo;

  return (
    <Table.Row className="border-t-1 border-blue-gray">
      <Table.Td>{igdbId}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{price}</Table.Td>
      <Table.Td>{discountPrice}</Table.Td>
      <Table.Td>{availableKeys}</Table.Td>
      <Table.Td>
        <Table.Actions className="flex gap-6">
          <Button className="cursor-pointer">
            <FaEdit />
          </Button>
          <Button className="cursor-pointer">
            <FaTrashAlt />
          </Button>
          <Button className="cursor-pointer">
              <FaKey />
          </Button>
        </Table.Actions>
      </Table.Td>
    </Table.Row>
  );
}
