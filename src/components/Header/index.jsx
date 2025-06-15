import {
  Bars3Icon,
  MoonIcon,
  BellIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { themeChange } from "theme-change";
import { signOut } from "@/containers/Login/actions";
import { useDispatch } from "react-redux";
import DigitalClockWithJalali from "../DigitalClockWithDate";
import CalculatorModal from "../CalculatorModal";
import CalendarWithEvent from "../DataPicker";
import Notification from "../../containers/Notification";

function Header() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const dispatch = useDispatch();
  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => { };

  return (
    <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
      {/* Menu toogle for mobile view or small screen */}
      <div className="flex-1">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <Bars3Icon className="h-5 inline-block w-5" />
        </label>
        {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
      </div>

      <div className="flex-none ">
        <DigitalClockWithJalali />
        <CalculatorModal />
        <CalendarWithEvent />
        {/* Light and dark theme selection toogle **/}
        <label className="swap ">
          <input type="checkbox" />
          <SunIcon
            data-set-theme="light"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "dark" ? "swap-on" : "swap-off")
            }
          />
          <MoonIcon
            data-set-theme="dark"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "light" ? "swap-on" : "swap-off")
            }
          />
        </label>

        {/* Notification icon */}
       <Notification />
       

        {/* Profile icon, opening menu on click */}
        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/public/favicon-32x32.png" alt="profile" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="justify-between">
              <Link to={"/settings-profile"}>تنظیمات پروفایل</Link>
            </li>

            <div className="divider mt-0 mb-0"></div>
            <li>
              <a onClick={() => dispatch(signOut())}>خروج</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
