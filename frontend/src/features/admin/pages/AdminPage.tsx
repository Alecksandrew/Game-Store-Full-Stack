import SectionHeader from "@/global/components/SectionHeader/SectionHeader";
import { GameDashboardTable } from "../components/GameDashboardTable";

export default function AdminPage(){
    return(
    <>
    <div className="w-full h-full bg-bg-primary flex flex-col justify-center items-center py-10">
    <div>
        <SectionHeader title="Admin dashboard"/>
        <GameDashboardTable/>
    </div>
    </div>
    </>);
}