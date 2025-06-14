// src/utils/dateUtils.js
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
// یک آرایه از ماه‌های شمسی
export const persianMonths = [
  { value: 1, label: "فروردین" },
  { value: 2, label: "اردیبهشت" },
  { value: 3, label: "خرداد" },
  { value: 4, label: "تیر" },
  { value: 5, label: "مرداد" },
  { value: 6, label: "شهریور" },
  { value: 7, label: "مهر" },
  { value: 8, label: "آبان" },
  { value: 9, label: "آذر" },
  { value: 10, label: "دی" },
  { value: 11, label: "بهمن" },
  { value: 12, label: "اسفند" },
];



/**
 * یک شیء DateObject از یک رشته ISO یا JS Date می‌سازد
 * @param {string|Date|number} isoOrDate
 * @param {"gregorian"|"persian"} calendarType
 * @returns {DateObject}
 */
export function toDateMyObject(isoOrDate, calendarType = "persian") {
  return new DateObject({
    date: isoOrDate,
    calendar: calendarType === "persian" ? persian : "en",
    locale: calendarType === "persian" ? persian_fa : "en",
  });
}

/**
 * ۱) ISO string → رشته شمسی
 * @param {string} isoString
 * @returns {string}
 */
export function isoToJalali(isoString) {
  return toDateMyObject(isoString, "persian");
}

/**
 * ۲) ISO string → رشته میلادی (YYYY-MM-DD)
 * @param {string} isoString
 * @returns {string}
 */
export function isoToGregorian(isoString) {
  return toDateMyObject(isoString, "gregorian");
}

/**
 * ۶) DateObject → ISO string
 * @param {DateObject} dateObj
 * @returns {string}
 */
export function dateObjectToISO(dateObj) {
  return dateObj.toDate().toISOString();
}

/**
 * ۹) تاریخ امروز به صورت رشته شمسی
 */
export function todayJalali(format = "YYYY/MM/DD") {
  return isoToJalali(new Date().toISOString(), format);
}

/**
 * ۱۰) تاریخ امروز به صورت رشته میلادی
 */
export function todayGregorian(format = "YYYY-MM-DD") {
  return isoToGregorian(new Date().toISOString(), format);
}
