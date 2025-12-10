import { useGameDashboardContext } from "../context";

export function Feedback() {
  const { warningType, warningComponent } = useGameDashboardContext();

  if (warningType !== "error") return null;

  return <>{warningComponent}</>;
}
