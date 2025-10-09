import type { HTMLAttributes, ReactNode } from "react";



export interface FormContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}