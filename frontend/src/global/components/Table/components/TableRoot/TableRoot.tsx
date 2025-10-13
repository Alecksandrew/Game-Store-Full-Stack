import type { tableProps } from "./types";

export function TableRoot({ children, ...props }: tableProps) {
  return (
    <table {...props}>
      {children}
    </table>
  );
}