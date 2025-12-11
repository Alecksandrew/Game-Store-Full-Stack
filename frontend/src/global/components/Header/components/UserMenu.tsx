import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { TRANSITION_DURATION, TRANSITION_EASE } from "@/global/constants/theme";

export function UserMenu() {
  const { handleLogout, myAccountData } = useContext(MyAccountContext);
  const isAdmin = myAccountData?.role === "Admin";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-2 text-text-primary hover:text-white transition-colors focus:outline-none font-medium cursor-pointer">
        <span className="hidden md:inline">My Account</span>
        <FaChevronDown className="text-xs" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter={`transition ${TRANSITION_EASE} ${TRANSITION_DURATION}`}
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave={`transition ${TRANSITION_EASE} ${TRANSITION_DURATION}`}
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-bg-secondary shadow-lg ring-1 ring-primary/20 focus:outline-none z-50">
          <div className="px-1 py-1">
            {isAdmin && (
              <MenuItem>
                {({ active }) => (
                  <Link
                    to={PAGE_ROUTES.ADMIN.DASHBOARD}
                    className={`${
                      active ? "bg-primary text-white" : "text-text-primary"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </MenuItem>
            )}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/my-account"
                  className={`${
                    active ? "bg-primary text-white" : "text-text-primary"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Personal Info
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary text-white" : "text-text-primary"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Purchase History
                </button>
              )}
            </MenuItem>
          </div>
          <div className="px-1 py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-danger text-white" : "text-text-primary"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
