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
          font-inter text-text-primary min-w-[325px] w-1/2 max-w-xl min-h-60 h-1/3 max-h-100
          flex flex-col items-center text-center justify-around
          ${borderColorClass}`}>
          <div>
            <p className={`font-orbitron font-bold text-2xl md:text-3xl xl:text-4xl mb-2 ${textColorClass}`}>
              {isSuccess ? "Success!" : "An error has happened!"}
            </p>
            <p className="font-inter font-light text-sm md:text-shadow-md xl:text-xl">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 px-3 py-1 text-md font-semibold rounded font-orbitron
            hover:bg-opacity-80 transition-colors ${buttonColorClass}`}
          >
            Close
          </button>
        </div>
      </div>
  );
};
