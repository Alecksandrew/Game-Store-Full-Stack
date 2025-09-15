import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

export default function ToggleWishlistButton({
  className,
  gameId,
  initialIsWishlisted,
}: ToggleWishlistProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(initialIsWishlisted);
  const { execute: addToWishlist,  isLoading: isAdding  } = useAddToWishlist();
  const { execute: removeFromWishlist, isLoading: isRemoving } = useRemoveFromWishlist();
  const { refetchWishlist } = useContext(WishlistContext);

  useEffect(() => {
    setIsWishlisted(initialIsWishlisted);
  }, [initialIsWishlisted]);

  const isDisabled = isAdding || isRemoving;

  const handleToggle = async () => {
    if(isDisabled) return;

    if (isWishlisted) {
      await removeFromWishlist(gameId);
    } else {
      await addToWishlist(gameId);
    }
    setIsWishlisted(!isWishlisted);
    refetchWishlist();
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleToggle}
      className={`p-1 rounded bg-text-primary aspect-square flex justify-center items-center text-2xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isWishlisted ? (
        <MdOutlineFavorite className="fill-primary" />
      ) : (
        <MdOutlineFavoriteBorder className="fill-primary" />
      )}
    </button>
  );
}