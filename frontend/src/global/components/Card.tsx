// src/components/Card.tsx
import { type CardProps } from "../types/CardType";


export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`flex flex-col justify-center relative z-10 min-w-[325px] w-1/2 max-w-[600px] rounded border-2 border-primary p-6 bg-bg-secondary ${className}`}
    >
      {children}
    </div>
  );
}
