import type { ReactNode } from "react";

interface GameCardBodyProps {
  children: ReactNode;
}

export default function GameCardBody({ children }: GameCardBodyProps) {
  return (
    <div className=" flex flex-col justify-between p-3 flex-1">{children}</div>
  );
}
