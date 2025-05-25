import React, { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DigitalClockWithJalali = () => {
  // ذخیره زمان به عنوان state و به‌روزرسانی هر ثانیه
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  // فرمت ساعت به صورت HH:MM:SS
  const formattedTime = time.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // تبدیل تاریخ میلادی به تقویم شمسی با استفاده از DateObject از react-multi-date-picker
  const persianDate = new DateObject({
    date: time,
    calendar: persian,
    locale: persian_fa,
  }).format("YYYY/MM/DD");

  return (
    <div className="hidden items-center justify-center gap-2 p-3 sm:flex">
      <div className="">{formattedTime}</div>
      <div className="">{persianDate}</div>
    </div>
  );
};

export default DigitalClockWithJalali;
