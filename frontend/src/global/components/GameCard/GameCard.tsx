import GameCardActions from "./components/Actions/Actions";
import GameCardBody from "./components/Body/Body";
import GameCardImage from "./components/GameCardImage";
import GameCardPrice from "./components/GameCardPrice";
import GameCardRoot from "./components/Root/Root";
import GameCardTitle from "./components/GameCardTitle";
import GameCardWishlist from "./components/GameCardWishlist";

export const GameCard = {
  Root: GameCardRoot,
  Title: GameCardTitle,
  Actions: GameCardActions,
  Price: GameCardPrice, // I need to put one div putting together Title and Price
  Image: GameCardImage,
  Wishlist:GameCardWishlist,
  Body: GameCardBody
}