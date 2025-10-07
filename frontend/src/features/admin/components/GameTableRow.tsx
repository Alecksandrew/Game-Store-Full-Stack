import { Table } from "@/global/components/Table/index";
import type { gameTableRowProps } from "../types/gameTableRowType";

export default function GameTableRow({gameInfo}:{gameInfo: gameTableRowProps}) {
  const { igdbId, name, price, discountPrice, availableKeys } = gameInfo;

  return (
    <Table.Row className="font-extralight">
      <Table.Td>{igdbId}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{price}</Table.Td>
      <Table.Td>{discountPrice}</Table.Td>
      <Table.Td>{availableKeys}</Table.Td>
    </Table.Row>
  );
}
