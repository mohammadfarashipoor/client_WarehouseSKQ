import pagesData from "@/routes/pagesData";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  const pageRoutes = pagesData.flatMap((pageGroup) =>
    pageGroup.flatMap(
      ({ path, title, element, isProtected, isAuth, submenu }) => {
        // ایجاد مسیرهای اصلی
        const mainRoute = <Route key={path} path={path} element={element} />;

        // ایجاد مسیرهای زیرمنو (submenu)
        const submenuRoutes = submenu
          ? submenu.map(
              ({ path: subPath, title: subTitle, element: subElement }) => (
                <Route key={subPath} path={subPath} element={subElement} />
              )
            )
          : [];

        return [mainRoute, ...submenuRoutes];
      }
    )
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default AppRoutes;
