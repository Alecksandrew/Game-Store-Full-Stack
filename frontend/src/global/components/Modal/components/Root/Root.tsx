import type { RootProps } from "./types";

export function Root({ children, isOpen, onClose }: RootProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-text-secondary/40 flex items-center justify-center backdrop-blur-[2px]"
      onClick={onClose} // Close when click on background
    >
      <div
        className="bg-bg-secondary rounded-lg font-inter text-text-primary min-w-[325px] w-1/2 max-w-xl flex flex-col items-center text-center justify-around gap-4"
        onClick={(e) => e.stopPropagation()} // Avoid click inside modal close
      >
        {children}
      </div>
    </div>
  );
}
