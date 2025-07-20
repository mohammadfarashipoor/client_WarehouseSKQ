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
        <label htmlFor="notification-drawer" className="btn btn-primary drawer-button btn-ghost ml-4 btn-circle">
          <BellIcon className="h-6 w-6" />
        </label>
      </div>
      <div className="drawer-side reletive overflow-hidden h-[92vh] top-auto bottom-px">
        <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {notificationsActive ? <NoContent /> : notificationsActive.map((notif, index) => (
            <li><NotificationCard key={notif._id} onMarkAsRead={(_id) => { markAsReadNotificationHandle(_id) }} {...notif} /></li>
          )) }

          <Link className="fixed bottom-px left-1/2  transform -translate-x-1/2 -translate-y-1/2  translate-y-0 bg-base-300 p-2 reounded w-[98%] text-center" onClick={closeDrawer} to={"/notification"}>مشاهده همه</Link>
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
