import type { TdProps } from "../../../types/TableTypes/tdType";

export  function Td({
  children,
  ...props
}: TdProps) {
  return <td {...props}>{children}</td>
}
