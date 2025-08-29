import type { ElementType } from "react";

type PurchaseBenefitsCardProps = {
    heading:  "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className:string
}

export default function PurchaseBenefitsCard({ heading, className }:PurchaseBenefitsCardProps) {
  const Heading: ElementType = heading;
  return (
    <div className={`bg-bg-secondary rounded p-2 ring-1 ring-primary ${className}`}>
      <Heading className="text-2xl text-text-primary">What you get</Heading>
      <ul className="text-sm text-text-secondary list-disc list-inside">
        <li>Digital game key for instant download</li>
        <li>Full game access with all features</li>
        <li>Lifetime access to your game</li>
        <li>24/7 customer support</li>
      </ul>
    </div>
  );
}
