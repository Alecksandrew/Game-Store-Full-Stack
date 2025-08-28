import { Link } from "react-router";
import { IoMenu } from "react-icons/io5";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

export default function Header() {
  const jwtToken = localStorage.getItem("jwtToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px");
  const linkClass = `hover:bg-bg-secondary hover:text-text-primary w-full text-center rounded flex items-center justify-center`;
  const buttonClass = `p-1.5 rounded`;
  const containerOptionsClass =
    `bg-primary text-text-primary flex justify-center gap-5  ` +
    (!isMobile
      ? ` relative max-w-150 mx-auto`
      : `absolute z-20 flex-col w-full top-full border-b-4 border-primary ${
          !isMenuOpen ? `hidden` : null
        }`);

  function renderContainerLinks() {
    return (
      <div className={containerOptionsClass}>
        <Link className={linkClass} to={"/"}>
          <button className={buttonClass}>Home</button>
        </Link>
        <Link className={linkClass} to={"/wishlist"}>
          <button className={buttonClass}>Wishlist</button>
        </Link>
        <Link className={linkClass} to={"/cart"}>
          <button className={buttonClass}>Cart</button>
        </Link>
        <Link className={linkClass} to={"/admin"}>
          <button className={buttonClass}>Admin</button>
        </Link>
        <Link className={linkClass} to={"/my-account"}>
          <button className={buttonClass}>My account</button>
        </Link>
        {jwtToken != null ? (
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              window.location.reload();
            }}
            className={`${buttonClass} bg-danger`}
          >
            Logout
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-20 max-w-screen bg-primary border-b-2 border-text-primary">
      {isMobile ? (
        <>
          <IoMenu
            className="text-5xl text-text-primary ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && renderContainerLinks()}
        </>
      ) : (
        renderContainerLinks()
      )}
    </header>
  );
}
