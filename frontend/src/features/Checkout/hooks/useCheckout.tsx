import { useContext } from "react";
import { useNavigate } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { CartContext } from "@/features/Cart/context/CartContext";
import type { CreditCardFormData } from "@/features/Checkout/types/CreditCardFormType";
import type {
  CheckoutRequest,
  CheckoutResponse,
} from "@/global/services/checkout/types";
import { checkoutService } from "@/global/services/checkout/checkoutService";

// O tipo de dado que nosso backend espera
type CheckoutRequestData = {
  gameIds: number[];
  cardDetails: CreditCardFormData;
};

export function useCheckout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    executeRequest: executeCheckout,
    isLoading,
    ...rest
  } = useRequestHandler<CheckoutRequest, CheckoutResponse>(
    checkoutService.processCheckout
  );

  const handleCheckout = async (cardData: CreditCardFormData) => {
    const gameIds = cartItems.map((item) => item.id);

    if (gameIds.length === 0) return;

    const requestData: CheckoutRequestData = {
      gameIds,
      cardDetails: cardData,
    };

    const response = await executeCheckout(requestData);

    if (response) {
      clearCart();
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return {
    handleCheckout,
    isLoading,
    ...rest,
  };
}
