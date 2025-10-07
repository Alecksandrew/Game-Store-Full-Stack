import type { tableProps } from "../../../types/TableTypes/tableType";

export function Table({ children, ...props }: tableProps) {
  return (
    <table {...props}>
      {children}
    </table>
  );
}