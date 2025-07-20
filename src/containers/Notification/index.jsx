import { connect } from "react-redux";
import actions from "@/context/actions";
import { useEffect, useState } from "react";
import SuspenseContent from "../../components/SuspenseContent";
import RowNotification from "../../components/RowNotification";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import NoContent from "../../components/NoContent";

function Notification(props) {
  const { notifications, isLoading, fetchNotificationHandle, markAsReadNotificationHandle, deleteNotificationHandle } = props;
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchNotificationHandle();
  }, []);

  // آیا همه سطرها انتخاب شده‌اند؟
  const allSelected =
    notifications.length > 0 && selectedIds.length === notifications.length;

  // هندلر برای تیک زدنِ «انتخاب همه»
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(notifications.map((n) => n._id));
    } else {
      setSelectedIds([]);
    }
  };

  // هندلر برای تیک خوردن/برداشتن تیک هر سطر
  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const readNotificationHandle = () => {
    if (!selectedIds.length) return;
    try {
      selectedIds.map((id) => {
        selectedIds.filter(id => {
          const notif = notifications.find(n => n._id === id);
          if (!notif.markAsRead) {
            markAsReadNotificationHandle(notif._id);
          }
        });
      })

      setSelectedIds([]);
    } catch (err) {
      console.error("خطا در حذف اعلان‌ها:", err);
    }
  };
  const rmoveNotificationHandle = async () => {
    if (!selectedIds.length) return;
    try {
      selectedIds.map(id => deleteNotificationHandle(id));
      setSelectedIds([]);
    } catch (err) {
      console.error("خطا در حذف اعلان‌ها:", err);
    }
  };
  return (
    <div className="overflow-x-auto">
      {isLoading ? <SuspenseContent /> :
        notifications ? <NoContent message="اعلانی یافت نشد"/> :
          (<table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="flex items-center justify-center gap-1 ">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />

                  </label>

                </th>
                {selectedIds.length ?
                  <>
                    <th></th>
                    <th></th>
                    <th ><button className="btn btn-sm flex gap-1 items-center flex-nowrap" onClick={readNotificationHandle}>< CheckIcon className="w-4 h-4" /> <span>خوانده شده</span></button></th>
                    <th ><button className="btn btn-sm flex gap-1 items-center flex-nowrap" onClick={rmoveNotificationHandle}><TrashIcon className="w-4 h-4" /> <span>حذف</span></button></th>
                  </> :
                  <>
                    <th>عنوان</th>
                    <th>پیام</th>
                    <th>وضعیت</th>
                    <th>تاریخ</th>
                  </>
                }

              </tr>
            </thead>
            <tbody>
              {notifications && notifications.map((notif) => (
                <RowNotification
                  key={notif._id}
                  {...notif}
                  selected={selectedIds.includes(notif._id)}
                  onSelect={() => handleSelectOne(notif._id)}
                />
              ))}
            </tbody>
          </table>)
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    isLoading: state.notification.isLoading,
  };
};
export default connect(mapStateToProps, actions)(Notification);
