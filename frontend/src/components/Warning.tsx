import { type WarningProps } from "../types/warningType";
import { type FC } from "react";

export const Warning: FC<WarningProps> = ({ message, type, onClose }) => {
  const isSuccess = type === "success";
  const borderColorClass = isSuccess ? "border-primary" : "border-danger";
  const buttonColorClass = isSuccess ? "bg-primary" : "bg-danger";
  const textColorClass = isSuccess ? "text-primary" : "text-danger";

  return (
      <div
        className={`
        fixed inset-0 z-50              
        bg-text-secondary/40
        flex items-center justify-center
        backdrop-blur-[2px]
      `}
      >
        <div className={`
         bg-bg-secondary border-t-4 p-4 rounded-lg
          font-inter text-text-primary w-xs h-fit
          flex flex-col items-center text-center min-h-60 justify-around
          ${borderColorClass}`}>
          <div>
            <p className={`font-orbitron font-bold text-xl ${textColorClass}`}>
              {isSuccess ? "Success!" : "An error has happened!"}
            </p>
            <p className="text-sm font-inter font-light">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 px-3 py-1 text-sm font-semibold rounded font-orbitron
            hover:bg-opacity-80 transition-colors ${buttonColorClass}`}
          >
            Fechar
          </button>
        </div>
      </div>
  );
};
