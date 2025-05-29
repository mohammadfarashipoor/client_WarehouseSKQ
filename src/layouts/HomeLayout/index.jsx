import Header from "../../components/Header";
import Menu from "../../components/Menu";

function HomeLayout({ children }) {
  return (
    <>
      <div className="drawer  lg:drawer-open">
        <div className="drawer-content flex flex-col ">
          <Header />
          <main className="flex-1 overflow-y-auto bg-base-200 py-4 px-6">
            {children}
          </main>
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
