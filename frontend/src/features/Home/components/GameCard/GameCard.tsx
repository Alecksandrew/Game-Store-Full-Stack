import GameCardActions from "./CompoundComponents/GameCardActions";
import GameCardBody from "./CompoundComponents/GameCardBody";
import GameCardImage from "./CompoundComponents/GameCardImage";
import GameCardPrice from "./CompoundComponents/GameCardPrice";
import GameCardRoot from "./CompoundComponents/GameCardRoot";
import GameCardTitle from "./CompoundComponents/GameCardTitle";
import GameCardWishlist from "./CompoundComponents/GameCardWishlist";

export const GameCard = {
  Root: GameCardRoot,
  Title: GameCardTitle,
  Actions: GameCardActions,
  Price: GameCardPrice, // I need to put one div putting together Title and Price
  Image: GameCardImage,
  Wishlist:GameCardWishlist,
  Body: GameCardBody
}