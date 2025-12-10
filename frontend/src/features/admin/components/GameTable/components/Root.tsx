import { Table as TableComponent } from "@/global/components/Table/Table";
import type { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <TableComponent.Root className="text-text-primary table-fixed">
      {children}
    </TableComponent.Root>
  );
}
