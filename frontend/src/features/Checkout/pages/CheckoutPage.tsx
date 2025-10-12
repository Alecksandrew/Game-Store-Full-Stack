import Header from "@/features/Home/components/Header";
import OrderSummary from "@/features/Cart/components/OrderSummary";
import { type CreditCardFormData } from "../types/CreditCardFormType";
import { useContext } from "react";
import { CartContext } from "@/features/Cart/context/CartContext";
import { Navigate } from "react-router";
import { useCheckout } from "@/features/Cart/hooks/useCheckout";
import CreditCardForm from "../components/CreditCardForm";
import Button from "@/global/components/Button/Button";

export default function CheckoutPage() {
  const { execute, isLoading, warningComponent } = useCheckout();
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckoutSubmit = (data: CreditCardFormData) => {
    console.log(data)
    execute(data);
  };

  return (
    <>
      {warningComponent}
      <div className="bg-bg-primary min-h-screen py-10">
        <div className="w-9/10 max-w-[1200px] mx-auto">
          <h1 className="text-4xl text-text-primary font-orbitron mb-6">
            Checkout
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-bg-secondary p-6 rounded-lg ring-1 ring-primary/50">
              <CreditCardForm
                onSubmit={handleCheckoutSubmit}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary>
                 <Button
                  title={isLoading ? "Processing..." : "Complete Payment"}
                  type="submit" 
                  form="credit-card-form"
                  disabled={isLoading}
                />
              </OrderSummary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
