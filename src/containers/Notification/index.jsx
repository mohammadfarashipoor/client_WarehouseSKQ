import { BellIcon } from "@heroicons/react/24/outline";
import NotificationCard from "../../components/NotificationCard";
import { useEffect } from "react";
import { connect } from "react-redux";
import actions from "@/context/actions";

function Notification(props) {
  const { notifications, notificationsActive, fetchNotificationActiveHandle } = props
  useEffect(() => {
    fetchNotificationActiveHandle()
  }, [])
  return (
    <div className="drawer drawer-end">
      <input id="notification-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="notification-drawer" className="btn btn-primary drawer-button btn-ghost ml-4 btn-circle">
          <BellIcon className="h-6 w-6" />
        </label>
      </div>
      <div className="drawer-side overflow-hidden h-[91vh] top-auto bottom-px">
        <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {notificationsActive &&  notificationsActive.map((notif,index)=>{
            <li><NotificationCard message={notif.title} onMarkAsRead={() => { }} /></li>
          })}
          
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    notificationsActive: state.notification.notificationsActive,
    isLoading: state.notification.isLoading,
  };
};
export default connect(mapStateToProps, actions)(Notification);
