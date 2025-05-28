import Login from "../containers/Login";
import NotFoundPage from "../containers/NotFound";
import Register from "../containers/Register";
import AuthLayout from "../layouts/authentication";
import HomeLayout from "../layouts/HomeLayout";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import { ShoppingBagIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import EmployeeList from "../containers/EmployeeList";
import CustomersList from "../containers/CustomersList";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;
const AuthPagesData = [
  {
    path: "/login",
    title: "login",
    element: <AuthLayout children={<Login />} />,
    isAuth: true,
  },
  {
    path: "/register",
    title: "register",
    element: <AuthLayout children={<Register />} />,
    isAuth: true,
  },
];
export const HomePagesData = [
  {
    path: "/",
    icon: <Squares2X2Icon className={iconClasses} />,
    title: "خانه",
    element: <HomeLayout children={<>hi</>} />,
    isAuth: true,
  },
  {
    path: "/employee",
    icon: <UserIcon className={iconClasses} />,
    title: "کارمندان",
    submenu: [
      {
        path: "/employee/list",
        icon: <UsersIcon className={submenuIconClasses} />,
        title: "لیست کارمندان",
        element: <HomeLayout children={<EmployeeList />} />,
      },
    ],
  },
   {
    path: "/customers",
    icon: <ShoppingBagIcon className={iconClasses} />,
    title: "مشتریان",
    submenu: [
      {
        path: "/customers/list",
        icon: <UsersIcon className={submenuIconClasses} />,
        title: "لیست مشتریان",
        element: <HomeLayout children={<CustomersList />} />,
      },
    ],
  },
];
const NotFoundPageData = [
  {
    path: "*",
    title: "یافت نشد",
    element: <NotFoundPage />,
  },
];
const pagesData = [AuthPagesData, HomePagesData, NotFoundPageData];

export default pagesData;
