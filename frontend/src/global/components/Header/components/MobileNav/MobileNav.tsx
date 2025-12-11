import { useContext, useState } from "react";

import { IoMenu } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { CartContext } from "@/features/Cart/context/CartContext";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { myAccountData, isLoggedIn, handleLogout } =
    useContext(MyAccountContext);
  const { cartItems } = useContext(CartContext);
  const isAdmin = myAccountData?.role === "Admin";

  const linkClass =
    "hover:bg-bg-secondary hover:text-text-primary w-full text-center rounded flex items-center justify-center p-2 font-medium text-text-primary transition-colors";

  const subLinkClass =
    "hover:bg-white/10 hover:text-white w-full text-center rounded flex items-center justify-center p-2 text-sm text-white transition-colors";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end p-1 gap-4">
        {isLoggedIn && (
          <Link
            to={PAGE_ROUTES.STORE.CART}
            className="relative text-text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <BsCart3 className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        )}
        <IoMenu
          className="text-5xl text-text-primary cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {isMenuOpen && (
        <nav className="absolute z-20 flex flex-col items-center w-full top-full bg-primary border-b-4 border-primary p-2 gap-2 shadow-xl">
          {/* Common Links */}
          <Link
            to={PAGE_ROUTES.STORE.HOME}
            className={linkClass}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/#categories"
            className={linkClass}
            onClick={handleLinkClick}
          >
            Categories
          </Link>

          {isLoggedIn ? (
            <>
              {/* Logged In Links */}
              <Link
                to={PAGE_ROUTES.STORE.WISHLIST}
                className={linkClass}
                onClick={handleLinkClick}
              >
                Wishlist
              </Link>

              {/* My Account Accordion */}
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`${linkClass} flex items-center justify-center gap-2`}
                >
                  My Account
                  {isAccountOpen ? (
                    <FaChevronUp className="text-xs" />
                  ) : (
                    <FaChevronDown className="text-xs" />
                  )}
                </button>

                {isAccountOpen && (
                  <div className="w-full bg-bg-secondary rounded-md flex flex-col items-center p-2 gap-1 mt-1">
                    {isAdmin && (
                      <Link
                        to={PAGE_ROUTES.ADMIN.DASHBOARD}
                        className={subLinkClass}
                        onClick={handleLinkClick}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/my-account"
                      className={subLinkClass}
                      onClick={handleLinkClick}
                    >
                      Personal Info
                    </Link>
                    <button className={subLinkClass} onClick={handleLinkClick}>
                      Purchase History
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                      className={`${subLinkClass} text-danger hover:text-danger hover:bg-danger/10`}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Guest Links */
            <>
              <Link
                to={PAGE_ROUTES.AUTH.LOGIN}
                className="relative group text-white font-medium px-2 py-2 w-full text-center"
                onClick={handleLinkClick}
              >
                Log In
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2" />
              </Link>
              <Link
                to={PAGE_ROUTES.AUTH.LOGIN}
                className="relative group text-white font-medium px-2 py-2 w-full text-center"
                onClick={handleLinkClick}
              >
                Sign Up
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2" />
              </Link>
            </>
          )}
        </nav>
      )}
    </>
  );
}
