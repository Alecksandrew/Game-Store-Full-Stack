import type { ApiResponse } from '@/global/types/responseApiType';
import type { CreditCardFormData } from '@/features/Checkout/types/CreditCardFormType';
export type CheckoutRequest = {
  gameIds: number[];
  cardDetails: CreditCardFormData;
};
export type CheckoutResponse = ApiResponse;
