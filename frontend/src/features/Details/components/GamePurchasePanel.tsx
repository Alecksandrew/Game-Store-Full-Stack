import PriceContainer from "@/global/components/PriceContainer";
import Platforms from "./Platforms";
import type { GamePurchasePanelProps } from "../types/GamePurchasePanel";



export default function GamePurchasePanel({gameData, className}:GamePurchasePanelProps){


    return(
        <div className={className}>
            <h1 className="text-2xl">{gameData.name}</h1>
            <Platforms heading="h3" platforms={gameData.platforms} className="mt-4"/>
            <PriceContainer gameData={gameData}/>
        </div>
    );
}