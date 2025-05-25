import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarIcon } from "@heroicons/react/24/outline";

function CalendarWithEvent() {
  // حالت‌های مربوط به نمایش مودال‌ها
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  // حالت‌های مربوط به داده‌های انتخاب شده
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);

  // حالت مربوط به ماه نمایش داده شده
  const [displayedMonth, setDisplayedMonth] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );

  // هویت کلیک روی ایکون تقویم
  const handleCalendarIconClick = () => {
    setShowDatePicker(true);
  };

  // تغییر تاریخ: ذخیره تاریخ به صورت فرمت فارسی و باز کردن مودال رویداد
  const handleDateChange = (date) => {
    const datePersian = new DateObject(date).convert(persian, persian_fa);
    setSelectedDate(datePersian);
    setAddEventModalOpen(true);
  };

  // ذخیره رویداد
  const handleSaveEvent = () => {
    if (eventName && selectedDate) {
      const newEvent = {
        date: selectedDate.toDate
          ? selectedDate.toDate()
          : new Date(selectedDate),
        event: eventName,
      };
      setEvents([...events, newEvent]);
      // بستن هر دو مودال
      setAddEventModalOpen(false);
      setShowDatePicker(false);
      setSelectedDate(null);
      setEventName("");
    } else {
      alert("لطفاً نام رویداد را وارد کنید.");
    }
  };

  // بستن مودال رویداد
  const handleCloseEventModal = () => {
    setAddEventModalOpen(false);
  };

  // بستن مودال تاریخ‌پیکر
  const handleCloseDatePickerModal = () => {
    setShowDatePicker(false);
    setSelectedDate(null);
  };

  // به‌روزرسانی ماه نمایش داده شده وقتی تقویم تغییر می‌کند
  const handleMonthChange = (date) => {
    const newMonth = new DateObject(date).convert(persian, persian_fa);
    setDisplayedMonth(newMonth);
  };

  return (
    <div className="p-2 px-3 relative">
      {/* ایکون تقویم */}

      <CalendarIcon
        onClick={handleCalendarIconClick}
        className="cursor-pointer w-7 h-7"
      />
      {/* مودال تاریخ‌پیکر */}
      {showDatePicker && (
        <div
          className="modal modal-open"
          onClick={(e) => {
            if (!addEventModalOpen && e.target === e.currentTarget) {
              handleCloseDatePickerModal();
            }
          }}
        >
          <div
            className="modal-box w-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              calendar={persian}
              locale={persian_fa}
              value={selectedDate}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange} // دریافت ماه جاری تقویم
              mapDays={({ date }) => {
                // بررسی اینکه روز به ماه نمایش داده شده تعلق دارد یا نه
                if (date.month.number !== displayedMonth.month.number)
                  return {};

                // بررسی اینکه آیا برای این روز رویدادی ثبت شده است
                const isEventDay = events.some((evt) => {
                  const eventDate = new DateObject(evt.date);
                  return (
                    eventDate.toDate().toLocaleDateString() ===
                    date.toDate().toLocaleDateString()
                  );
                });
                return {
                  className: isEventDay ? "has-event" : "",
                  children: (
                    <div className="calendar-day-content">
                      {date.day}
                      {isEventDay && (
                        <span
                          className="event-marker"
                          style={{ color: "red", marginLeft: 4 }}
                        >
                          ●
                        </span>
                      )}
                    </div>
                  ),
                };
              }}
            />
          </div>
        </div>
      )}

      {/* مودال رویداد */}
      {addEventModalOpen && (
        <div
          className="modal modal-open"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseEventModal();
            }
          }}
        >
          <div
            className="modal-box relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEventModal}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4 text-center">
              افزودن رویداد برای{" "}
              {selectedDate &&
                (selectedDate.toDate
                  ? selectedDate.format()
                  : new DateObject(selectedDate).format())}
            </h3>
            <input
              type="text"
              placeholder="نام رویداد"
              className="input input-bordered w-full mb-4"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            {events.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">رویدادهای ثبت‌شده:</h4>
                <ul className="">
                  {events.map((item, index) => {
                    const persianDate = new DateObject(item.date)
                      .convert(persian, persian_fa)
                      .format("YYYY/MM/DD"); // یا فرمت دلخواه خود را انتخاب کنید
                    return (
                      <li key={index}>
                        {persianDate} : {item.event}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="modal-action flex justify-between">
              <button onClick={handleSaveEvent} className="btn btn-primary">
                ذخیره
              </button>
              <button onClick={handleCloseEventModal} className="btn">
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWithEvent;
