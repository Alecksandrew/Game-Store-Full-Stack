import { useContext, type ElementType } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";

type PlatformsProps = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

export default function Platforms({
  heading,
  className,
}: PlatformsProps) {
  const {gameDetails} = useContext(GameDetailsDataContext)
  const platforms:string[] = gameDetails.platforms;
  
  function listPlatforms(platforms: string[]) {
    return platforms.map((platform) => {
      return (
        <li
          key={platform}
          className=" ring-1 ring-text-primary rounded p-1 text-text-primary font-inter italic text-sm font-light"
        >
          {platform}
        </li>
      );
    });
  }

  const Heading: ElementType = heading;
  return (
    <div className={className}>
      <Heading className="text-xl font-light text-text-primary">Available platforms</Heading>
      <ul className="flex flex-wrap list-none gap-2 text-sm mt-1">
        {listPlatforms(platforms)}
      </ul>
    </div>
  );
}
