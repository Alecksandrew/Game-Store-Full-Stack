import type { HTMLAttributes, ReactNode } from "react";



export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}