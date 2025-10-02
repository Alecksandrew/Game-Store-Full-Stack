import { useContext } from "react";
import Header from "@/features/Home/components/Header";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { Link, useNavigate } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "@/global/components/Button";

export default function CartPage() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-bg-primary min-h-screen py-10">
        <div className="w-9/10 max-w-[1200px] mx-auto">
          <h1 className="text-4xl text-text-primary font-orbitron mb-6">
            My Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center text-text-secondary py-20 rounded-lg">
              <MdOutlineShoppingCart className="mx-auto mb-4" size={"3rem"} />
              <p className="text-2xl mb-4">Your cart is empty.</p>
              <Link
                to="/"
                className="text-primary hover:underline font-bold text-lg"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <ul className="space-y-4">
                  {cartItems.map((game) => (
                    <CartItem key={game.id} game={game} />
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <OrderSummary>
                  <Button
                    title="Get your key(s)"
                    type="button"
                    onClick={() => navigate("/checkout")}
                  />
                </OrderSummary>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
