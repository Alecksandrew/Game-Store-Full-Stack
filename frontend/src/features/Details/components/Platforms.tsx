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
  const data = useContext(GameDetailsDataContext)
  const platforms:string[] = data.platforms;
  
  function listPlatforms(platforms: string[]) {
    return platforms.map((platform) => {
      return (
        <li
          key={platform}
          className=" bg-primary rounded p-1 text-text-primary italic"
        >
          {platform}
        </li>
      );
    });
  }

  const Heading: ElementType = heading;
  return (
    <div className={className}>
      <Heading className="text-xl font-bold">Available platforms</Heading>
      <ul className="flex list-none gap-2 text-sm">
        {listPlatforms(platforms)}
      </ul>
    </div>
  );
}
