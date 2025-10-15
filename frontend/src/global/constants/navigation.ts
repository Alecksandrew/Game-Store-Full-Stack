import { PAGE_ROUTES } from "./FRONTEND_URL";

export type NavLink = {
  title: string;
  to: string;
  authRequired?: boolean;     // O usuário precisa estar logado?
  allowedRoles?: string[];    // Quais roles podem ver este link?
};

export const navLinks: NavLink[] = [
  { title: "Home", to: PAGE_ROUTES.STORE.HOME },
  { title: "Wishlist", to: PAGE_ROUTES.STORE.WISHLIST, authRequired: true },
  { title: "Cart", to: PAGE_ROUTES.STORE.CART },
  { title: "My Account", to: PAGE_ROUTES.ACCOUNT, authRequired: true },
  {
    title: "Admin",
    to: PAGE_ROUTES.ADMIN.DASHBOARD,
    authRequired: true,
    allowedRoles: ["Admin"],
  }
]
