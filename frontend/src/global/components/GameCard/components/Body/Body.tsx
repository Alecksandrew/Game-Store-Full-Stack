import type { BodyProps } from "./types";




export function GameCardBody({ children }: BodyProps) {
  return (
    <div className=" flex flex-col justify-between p-3 flex-1">{children}</div>
  );
}
