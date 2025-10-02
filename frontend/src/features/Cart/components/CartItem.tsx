import { useContext } from 'react';
import { type GameCardData } from '@/features/Home/types/GameCardType';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

type CartItemProps = {
  game: GameCardData;
};

export default function CartItem({ game }: CartItemProps) {
  const { removeFromCart } = useContext(CartContext);
 
  const price = game.discountPrice ?? game.price ?? 0;

  return (
    <li className="flex gap-4 bg-bg-secondary p-3 rounded-lg ring-1 ring-primary/50">
      <img src={game.coverUrl} alt={game.name} className="w-30 h-36 object-cover rounded" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-text-primary">{game.name}</h3>
        <p className="text-sm text-text-secondary">PC Digital Key</p>
        <p className="text-xl font-semibold text-primary ">${price.toFixed(2)}</p>
      </div>
      <div className="">
        
        <button 
          onClick={() => removeFromCart(game.id)}
          className="text-danger hover:text-red-400 transition-colors"
          aria-label={`Remove ${game.name} from cart`}
        >
          <FaTrash size="1.5rem" />
        </button>
      </div>
    </li>
  );
}