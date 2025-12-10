import type { ReactNode } from "react";
import { GameDashboardProvider } from "../context";

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <GameDashboardProvider>
      <div className="p-4 bg-bg-secondary rounded-lg border-blue-gray w-fit min-h-[762px] ring-2 ring-primary">
        {children}
      </div>
    </GameDashboardProvider>
  );
}
