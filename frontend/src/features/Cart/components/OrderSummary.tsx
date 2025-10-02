import { useContext, type ReactNode } from 'react';
import { CartContext } from '../context/CartContext';

export default function OrderSummary({children}: {children:ReactNode}) {
  const { total } = useContext(CartContext);


  return (
    <div className="bg-bg-secondary p-6 rounded-lg ring-1 ring-primary/50 h-fit sticky top-24">
      <h2 className="text-2xl font-bold text-text-primary mb-4 font-orbitron">Order Summary</h2>
      <div className="flex justify-between text-text-secondary mb-2">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <hr className="border-text-secondary/20 my-4" />
      <div className="flex justify-between text-xl font-bold text-text-primary mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {children}
    </div>
  );
}