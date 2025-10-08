import type { ActionsType } from "@/global/types/TableTypes/actionsType";

export default function Actions({ children, ...props }: ActionsType) {
  return <div {...props}>{children}</div>;
}
