import Header from "../../components/Header";
import Menu from "../../components/Menu";

function HomeLayout({ children }) {
  return (
    <>
      <div className="drawer  lg:drawer-open">
        <div className="drawer-content flex flex-col ">
          <Header />
          {children}
        </div>

        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <Menu />
      </div>
    </>
  );
}

export default HomeLayout;
