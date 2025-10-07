import type { ThProps } from "../../../types/TableTypes/thType";

export  function Th({
  children,
  ...props
}: ThProps) {
  return <th {...props}>{children}</th>
}
