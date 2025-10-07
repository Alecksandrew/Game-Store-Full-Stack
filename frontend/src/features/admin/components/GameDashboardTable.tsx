import { Table } from "@/global/components/Table/index";

export function GameDashboardTable() {
  


  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.Th>IGDB Id</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Price with Discount</Table.Th>
          <Table.Th>Keys available</Table.Th>
        </Table.Row>
      </Table.Head>
      <Table.Body> 
        {}
      </Table.Body>
    </Table.Root>
  );
}
