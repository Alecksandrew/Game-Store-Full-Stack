import { useContext, useState } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";

export default function About({className}: {className?:string}) {
  const {gameDetails} = useContext(GameDetailsDataContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <h2 className="text-text-primary text-3xl">About</h2>
      <p
        className={`text-text-primary font-inter font-light text-justify ${
          !isOpen ? "line-clamp-3" : null
        }`}
      >
        {gameDetails.summary}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-right underline font-bold text-primary ml-auto italic block"
      >
        {!isOpen ? "More details" : "Less details"}
      </button>
    </div>
  );
}
