import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";




export default function CartPage(){
    const gameDataMockTest = {
    id: 1,
    name: "Starline Odyssey",
    coverUrl: "https://picsum.photos/seed/starline/400/560",
    price: 59.99,
    discountPrice: 29.99
  };


    return <>
    <ul>
        <CartItem game={gameDataMockTest}/>
    </ul>
    <OrderSummary/>
    
    </>
}