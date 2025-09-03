import Button from "./Button";

export default function BuyAndWishlistBtns() {
  return (
    <div className={`flex gap-2`}>
      <span className="w-7/10">
        <Button
          type="button"
          title="Add to cart"
          className={`bg-primary text-text-primary`}
        />
      </span>
      <span className="w-3/10">
        <Button
          type="button"
          title="Wishlist"
          className="ring-2 ring-primary text-primary hover:bg-primary hover:text-text-primary"
        />
      </span>
    </div>
  );
}
