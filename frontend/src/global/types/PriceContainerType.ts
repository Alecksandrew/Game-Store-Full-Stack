export type PriceContainerData = {
    price: number;
    discountPrice?: number | null;
}

export type PriceContainerProps = {
    gameData:PriceContainerData,
    className?:string,
}