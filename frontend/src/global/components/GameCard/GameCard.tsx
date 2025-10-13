import { Actions } from "./components/Actions";
import { Body } from "./components/Body";
import { Root } from "./components/Root";
import { Image } from "./components/Image";
import { Price } from "./components/Price";
import { Title } from "./components/Title";
import { WishlistToggle } from "./components/WishlistToggle";



export const GameCard = {
  Root:Root,
  Title: Title,
  Actions: Actions,
  Price: Price, // I need to put one div putting together Title and Price
  Image: Image,
  Wishlist: WishlistToggle,
  Body: Body
}