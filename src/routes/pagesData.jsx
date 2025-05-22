import Login from "../containers/Login";
import NotFoundPage from "../containers/NotFound";
import Register from "../containers/Register";
import AuthLayout from "../layouts/authentication";
import HomeLayout from "../layouts/HomeLayout";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
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
    title: "Home",
    element: <HomeLayout children={<>hi</>} />,
    isAuth: true,
  },
  {
    path: "/setting",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
    title: "Setting",
    submenu: [
      {
        path: "/setting/aa",
        icon: <AdjustmentsHorizontalIcon className={submenuIconClasses} />,
        title: "aa",
        element: <HomeLayout children={<>اعاا</>} />,
      },
    ],
  },
];
const NotFoundPageData = [
  {
    path: "*",
    title: "Not Found",
    element: <NotFoundPage />,
  },
];
const pagesData = [AuthPagesData, HomePagesData, NotFoundPageData];

export default pagesData;
