import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";

export default function ColumnInfo() {
  const {gameDetails} = useContext(GameDetailsDataContext);

  const infos: string[][] = [
    ["Release date", gameDetails?.firstReleaseDate?.toString() || "Unknown"],
    ["Genres", gameDetails.genres?.join(", ") || "Unknown"],
    ["Developers", gameDetails.involvedCompanies?.developers.join(", ") || "Unknown"],
    ["Publishers", gameDetails?.involvedCompanies?.publishers.join(", ") || "Unknown"],
    ["Game modes", gameDetails?.gameModes?.join(", ") || "Unknown"],
    ["Keys remaining", gameDetails.availableKeysStock.toString() || "Unknown"],
  ];

  function listInfos(infos: string[][]) {
    return infos.map((info) => {
      return (
        <li className="bg-bg-primary p-1 text-text-primary flex justify-between rounded-sm">
          <span>{info?.[0]}</span> <span className="max-w-6/10 text-right">{info?.[1]}</span>
        </li>
      );
    });
  }

  return (
    <div className="text-text-primary bg-bg-secondary rounded ring-1 ring-primary p-4">
        <h2 className="text-3xl">More infos</h2>
      <ul className="flex flex-col gap-2 mt-4">{listInfos(infos)}</ul>
    </div>
  );
}
