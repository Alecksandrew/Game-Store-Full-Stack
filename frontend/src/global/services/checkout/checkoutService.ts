
import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import type { CheckoutRequest, CheckoutResponse } from './types';
import { apiClient } from '../apiClient';

export const checkoutService = {

  async processCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
    return apiClient<CheckoutResponse>(
      API_ROUTES.CHECKOUT.PROCESS,
      {
        method: 'POST',
        body: request,
      },
      true
    );
  },
};