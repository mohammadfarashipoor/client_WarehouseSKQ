// اضافه کردن اعلان جدید
export const addNotification = (notification) => ({
  type: "ADD_NOTIFICATION",
  payload: notification, // notification: شیئی شامل id, message, type, timestamp, isRead و سایر اطلاعات مورد نیاز
});

// حذف یک اعلان بر اساس شناسه
export const removeNotification = (notificationId) => ({
  type: "REMOVE_NOTIFICATION",
  payload: { id: notificationId },
});

// علامت‌گذاری یک اعلان به عنوان خوانده شده
export const markAsRead = (notificationId) => ({
  type: "MARK_AS_READ",
  payload: { id: notificationId },
});

// تغییر وضعیت بارگذاری
export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading, // مقدار بولی: true یا false
});

// ثبت یا حذف خطا
export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error, // می‌تواند یک پیام خطا یا null باشد
});

// (اختیاری) تنظیم فیلتر برای اعلان‌ها، در صورتی که در state از فیلتر استفاده کنید.
export const setFilterType = (filterType) => ({
  type: "SET_FILTER_TYPE",
  payload: filterType, // به عنوان مثال: "all", "unread", "success", "error"
});
