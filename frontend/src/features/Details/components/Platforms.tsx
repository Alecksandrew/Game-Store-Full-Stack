import type { ElementType } from "react";

type PlatformsProps = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  platforms: string[];
  className?: string;
};

export default function Platforms({
  heading,
  platforms,
  className,
}: PlatformsProps) {
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
