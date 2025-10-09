import Form from "@/global/components/Form";
import FormHeader from "@/global/components/Form/CompoundComponents/FormHeader";
import { Input } from "@/global/components/Input";
import { type CreditCardFormData } from "../types/CreditCardFormType";

type CreditCardFormProps = {
  onSubmit: (data: CreditCardFormData) => void;
  isLoading: boolean;
};

export default function CreditCardForm({ onSubmit, isLoading }: CreditCardFormProps) {
  return (
    <Form<CreditCardFormData>
      onSubmit={onSubmit}
      isLoading={isLoading}
      id="credit-card-form"
    >
      <FormHeader
        title="Credit card"
        subTitle="Enter your card details to complete the purchase."
      />
      
      <Input
        label="Name on Card"
        name="cardName"
        type="text"
        placeholder="Name as it appears on card"
        rules={{ 
          required: "Name on card is required" 
        }}
      />
      
      <Input
        label="Card Number"
        name="cardNumber"
        type="text"
        placeholder="0000 0000 0000 0000"
        rules={{
          required: "Card number is required",
          pattern: {
            value: /^[0-9]{16}$/,
            message: "Please enter a valid 16-digit card number",
          },
        }}
      />

      <div className="flex gap-4 w-full">
        <Input
          label="Expiry Date"
          name="expiryDate"
          type="text"
          placeholder="MM/YY"
          rules={{
            required: "Expiry date is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              message: "Enter a valid date in MM/YY format",
            },
          }}
        />
        
        <Input
          label="CVC"
          name="cvc"
          type="text"
          placeholder="123"
          rules={{
            required: "CVC is required",
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: "Enter a valid CVC",
            },
          }}
        />
      </div>
    </Form>
  );
}