import type { BodyProps } from "./types";




export function Body({ children }: BodyProps) {
  return (
    <div className=" flex flex-col justify-between p-3 flex-1">{children}</div>
  );
}
