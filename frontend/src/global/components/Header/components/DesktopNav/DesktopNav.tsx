import { Link } from "react-router";
import { NavLink } from "../NavLink";
import { UserMenu } from "../UserMenu";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { BsCart3, BsCartFill } from "react-icons/bs";
import { useContext } from "react";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { CartContext } from "@/features/Cart/context/CartContext";
import { HOVER_TRANSITION } from "@/global/constants/theme";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

export function DesktopNav() {
  const { isLoggedIn } = useContext(MyAccountContext);
  const { cartItems } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 h-full relative">
      {/* Left: Brand */}
      <div className="flex-shrink-0 z-10">
        <Link
          to="/"
          className="text-2xl font-bold font-orbitron text-text-primary tracking-wider hover:text-white transition-colors"
        >
          GameStore
        </Link>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/#categories">Categories</NavLink>
      </nav>

      {/* Right: User Actions */}
      <div className="flex items-center gap-6 z-10">
        {isLoggedIn ? (
          <>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative w-6 h-6 group"
              aria-label="Wishlist"
            >
              <HiOutlineHeart
                className={`absolute inset-0 w-full h-full text-text-primary ${HOVER_TRANSITION} group-hover:opacity-0`}
              />
              <HiHeart
                className={`absolute inset-0 w-full h-full text-white opacity-0 ${HOVER_TRANSITION} group-hover:opacity-100`}
              />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-6 h-6 group"
              aria-label="Cart"
            >
              <BsCart3
                className={`absolute inset-0 w-full h-full text-text-primary ${HOVER_TRANSITION} group-hover:opacity-0`}
              />
              <BsCartFill
                className={`absolute inset-0 w-full h-full text-white opacity-0 ${HOVER_TRANSITION} group-hover:opacity-100`}
              />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-danger text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center z-20">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Account Menu */}
            <UserMenu />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to={PAGE_ROUTES.AUTH.LOGIN}
              className="relative group text-white font-medium px-2 py-1"
            >
              Log In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to={PAGE_ROUTES.AUTH.LOGIN}
              className="relative group text-white font-medium px-2 py-1"
            >
              Sign Up
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
