import type { ActionsProps } from "./types";


export function Actions({ children, ...props }: ActionsProps) {
  return <div {...props}>{children}</div>;
}
