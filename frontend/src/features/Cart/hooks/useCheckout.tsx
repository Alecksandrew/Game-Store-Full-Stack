import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useRequestHandler } from '@/global/hooks/useRequestHandler';
import { apiClient } from '@/global/services/apiClient';
import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import { CartContext } from '@/features/Cart/context/CartContext';
import type { CreditCardFormData } from '@/features/Checkout/types/CreditCardFormType';

// O tipo de dado que nosso backend espera
type CheckoutRequestData = {
  gameIds: number[];
  cardDetails: CreditCardFormData;
};

export function useCheckout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutApi = useRequestHandler<CheckoutRequestData, { message: string }>(
    (data) => {
      const options = {
        method: 'POST' as const,
        body: data,
      };

      return apiClient(API_ROUTES.CHECKOUT.PROCESS, options, true);
    }
  );

  const executeCheckout = async (cardData: CreditCardFormData) => {
    const gameIds = cartItems.map(item => item.id);

    if (gameIds.length === 0) return;

    const requestData: CheckoutRequestData = {
        gameIds,
        cardDetails: cardData
    };
    
    console.log("request data", requestData)
    const response = await checkoutApi.execute(requestData);

    console.log("response", response)
    if (response) {
      clearCart();
      setTimeout(() => navigate('/'), 2000); 
    }
  };

  return {
    execute: executeCheckout,
    isLoading: checkoutApi.isLoading,
    warningComponent: checkoutApi.warningComponent,
  };
}