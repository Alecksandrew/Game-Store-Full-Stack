import SectionHeader from "@/global/components/SectionHeader/SectionHeader";
import { GameDashboard } from "../components/GameDashboard";
import { GameTable } from "../components/GameTable";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-bg-primary flex flex-col justify-center items-center py-10">
      <div>
        <GameDashboard.Root>
          <GameDashboard.Header>
            <SectionHeader title="Admin dashboard" />
            <GameDashboard.Search />
          </GameDashboard.Header>

          <GameDashboard.Body>
            <GameTable.Root>
              <GameTable.Header />
              <GameTable.Body />
            </GameTable.Root>
          </GameDashboard.Body>

          <GameDashboard.Footer>
            <GameDashboard.Pagination />
          </GameDashboard.Footer>

          <GameDashboard.Modals />
          <GameDashboard.Feedback />
        </GameDashboard.Root>
      </div>
    </div>
  );
}
