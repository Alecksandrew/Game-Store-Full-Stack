import { useEffect, useState } from "react";
import type { RootProps } from "./types";
import { twMerge } from "tailwind-merge";
import { MODAL_FADE_AND_SCALE_ANIMATION_MS } from "@/global/constants/appConfig";

export function Root({ children, isOpen, onClose }: RootProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
    } else {

      timeoutId = window.setTimeout(() => setIsRendered(false), MODAL_FADE_AND_SCALE_ANIMATION_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-text-secondary/40 backdrop-blur-[2px]",
        isOpen ? "animate-fade-in" : "animate-fade-out"
      )}
      onClick={onClose} // Close when click on background
    >
      <div
        className={twMerge(
          "bg-bg-secondary rounded-lg font-inter text-text-primary min-w-[325px] w-1/2 max-w-xl flex flex-col items-center text-center justify-around gap-4",
          isOpen ? "animate-scale-in" : "animate-scale-out"
        )}
        onClick={(e) => e.stopPropagation()} // Avoid click inside modal close
      >
        {children}
      </div>
    </div>
  );
}
