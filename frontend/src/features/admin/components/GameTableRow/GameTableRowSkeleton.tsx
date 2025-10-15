import { Skeleton } from "@/global/components/Skeleton/Skeleton";
import { Table } from "@/global/components/Table/Table";

export default function GameTableRowSkeleton() {
    return (
      <Table.Row className="border-t py-10  border-blue-gray">
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
        <Table.Td>
          <Skeleton className="h-6 w-full" />
        </Table.Td>
      </Table.Row>
    );
  }
  