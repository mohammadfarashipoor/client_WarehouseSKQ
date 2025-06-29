// src/utils/dateUtils.js
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import gregorian_en from "react-date-object/locales/gregorian_en";
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

export function getPersianYears(startYear = 2025) {
  const current = new Date().getFullYear();

  const count = current - startYear + 1;
  if (count < 1) return [];

  return Array.from({ length: count }, (_, idx) => {
    const year = startYear + idx;
    return {
      value: idx + 1,
      label: year.toString()
    };
  });
}
export const persianYears = getPersianYears(2025);
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

/**
 * تبدیل میلادی (رشته "YYYY/MM/DD") به شمسی
 * @param {string} gDate — مثلاً "2025/6/15"
 * @returns {{year:number, month:number, monthName:string, day:number}}
 */
export function toJalaliFromGregorian(gDate) {
  // 1) جداسازی سال/ماه/روز از رشته
  let [gy, gm, gd] = gDate.split("/");
  // اگر ورودی درست نباشد، از مقدار پیش‌فرض استفاده می‌کنیم
  if (!gy || !gm) throw new Error("فرمت ورودی نامعتبر است: باید 'YYYY/M/D'");
  gd = gd || 1;

  // 2) ساخت DateObject میلادی
  const dobj = new DateObject({
    calendar: gregorian,
    locale: gregorian_en,
    year: gy,
    month: gm,
    day: gd
  });

  // 3) تبدیل به شمسی
  dobj.convert(persian, persian_fa);

  return `${dobj.year}/${dobj.month}/${dobj.day}`
}

/**
 * تبدیل شمسی (رشته "YYYY/MM/DD") به میلادی
 * @param {string} jDate — مثلاً "1404/2/1"
 * @returns {{year:number, month:number, monthName:string, day:number}}
 */
export function toGregorianFromJalali(jDate) {
  let [jy, jm, jd] = jDate.split("/");

  if (!jy || !jm) throw new Error("فرمت ورودی نامعتبر است: باید 'YYYY/M/D'");
  jd = jd || 1;

  // ساخت DateObject شمسی
  const dobj = new DateObject({
    year: jy,
    month: jm,
    day: jd,
    calendar: persian,
    locale: persian_en,

  });

  // تبدیل به میلادی
  dobj.convert(gregorian, gregorian_en);
  return `${dobj.year}/${dobj.month}/${dobj.day}`

}

