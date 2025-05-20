import Login from "../containers/Login";
import Register from "../containers/Register";
import AuthLayout from "../layouts/authentication";

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
const HomePagesData = [
  {
    path: "/",
    title: "Home",
    element: <>hi</>,
    isAuth: true,
  },
];
const NotFoundPageData = [
  {
    path: "*",
    title: "Not Found",
    element: <>NotFoundPageData</>,
  },
];
const pagesData = [AuthPagesData, HomePagesData, NotFoundPageData];

export default pagesData;
