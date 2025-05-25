import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SubMenu from "../SubMenu";
import { HomePagesData as routes } from "@/routes/pagesData";

function Menu() {
  const location = useLocation();

  return (
    <div className="drawer-side z-5">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
        <li className="mb-2 font-semibold text-xl">
          <Link to={"/app/welcome"}>
            <img
              className="mask mask-squircle w-10"
              src="/logo192.png"
              alt="DashWind Logo"
            />
            سنگ کاغذ قیچی
          </Link>
        </li>
        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              {route.submenu ? (
                <SubMenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-semibold  bg-base-200 " : "font-normal"
                    }`
                  }
                >
                  {route.icon} {route.title}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 right-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
