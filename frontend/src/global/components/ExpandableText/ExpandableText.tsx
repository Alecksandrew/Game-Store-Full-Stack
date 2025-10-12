import { useState } from "react";
import type { ExpandableTextProps } from "./types";


export default function ExpandableText({
  title = "About",
  text,
  maxLines = 3,
  className,
  expandText = "More details",
  collapseText = "Less details",
}: ExpandableTextProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {title && <h2 className="text-text-primary text-3xl">{title}</h2>}
      <p
        className={`text-text-primary font-inter font-light text-justify ${
          !isOpen ? `line-clamp-${maxLines}` : ""
        }`}
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