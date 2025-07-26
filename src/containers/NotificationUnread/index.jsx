import { BellIcon } from "@heroicons/react/24/outline";
import NotificationCard from "../../components/NotificationCard";
import { useEffect } from "react";
import { connect } from "react-redux";
import actions from "@/context/actions";
import { Link } from "react-router";
import NoContent from "../../components/NoContent";

function NotificationUnread(props) {
  const { notificationsActive, fetchNotificationUnReadHandle, markAsReadNotificationHandle } = props
  useEffect(() => {
    fetchNotificationUnReadHandle()
  }, [])
  const closeDrawer = () => {
    const drawer = document.getElementById("notification-drawer");
    if (drawer) drawer.checked = false;
  }

  return (
    <div className="drawer drawer-end">
      <input id="notification-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="notification-drawer" className=" btn btn-primary drawer-button btn-ghost ml-4 btn-circle">
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
          <span className="indicator-item badge badge-error badge-sm">{notificationsActive.length !== 0 && notificationsActive.length}</span>
            </div>
        </label>
      </div>
      <div className="drawer-side reletive overflow-hidden h-[91vh] top-auto bottom-px">
        <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu flex-nowrap overflow-y-scroll overflow-x-hidden bg-base-200 text-base-content min-h-full p-4  w-[85%] md:w-auto">
          <li><Link className="bg-base-300 p-2 reounded w-[98%] block w-full text-center" onClick={closeDrawer} to={"/notification"}>مشاهده همه</Link></li>
          {!notificationsActive ? <NoContent /> : notificationsActive.map((notif, index) => (
            <li key={notif._id}><NotificationCard  onMarkAsRead={(_id) => { markAsReadNotificationHandle(_id) }} {...notif} /></li>
          ))}

        </ul>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notificationsActive: state.notification.notificationsActive,
    isLoading: state.notification.isLoading,
  };
};
export default connect(mapStateToProps, actions)(NotificationUnread);
