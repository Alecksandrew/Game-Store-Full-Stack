import { useState } from "react";
import type { ExpandableTextProps } from "./types";
import { twMerge } from "tailwind-merge";

const lineClampClasses = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

type LineClampValue = keyof typeof lineClampClasses;

export default function ExpandableText({
  title = "About",
  text,
  maxLines = 3,
  className,
  expandText = "More details",
  collapseText = "Less details",
}: ExpandableTextProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clampClass =
    lineClampClasses[maxLines as LineClampValue] || "line-clamp-3";

  return (
    <div className={className}>
      {title && <h2 className="text-text-primary text-3xl">{title}</h2>}
      <p
        className={twMerge(
          "text-text-primary font-inter font-light text-justify",
          !isOpen && clampClass
        )}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-right underline font-bold text-primary ml-auto italic block"
      >
        {!isOpen ? expandText : collapseText}
      </button>
    </div>
  );
}
