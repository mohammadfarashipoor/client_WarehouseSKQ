/**
* @param {string} input   — رشتهٔ ورودی که شامل عدد است
* @param {string} sep     — جداکننده (پیش‌فرض: ',')
* @returns {string}       — عدد قالب‌بندی‌شده، مثال: "1,234,567"
*/
export function formatThousand(input, sep = ",") {
  if (!input) return 0
   // فقط ارقام را نگه دار
    const num = `${input}`.replace(/\D/g, "");
    // با regex از سمت راست هر سه رقم را قبل ازش sep بچسبان
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
/**
 * تبدیل رشتهٔ قالب‌بندی‌شده با جداکننده‌ هزارگان به عدد
 *
 * @param {string} input   — رشتهٔ ورودی، مثلا "1,234,567"
 * @param {string} sep     — جداکنندهٔ هزارگان (پیش‌فرض: ',')
 * @returns {number}       — عدد متناظر، مثال: 1234567
 */
export function parseThousand(input, sep = ",") {
  if (!input) return 0;

  // برای جلوگیری از بروز خطا اگر sep کاراکتر ویژهٔ regex باشد،
  // آن را escape می‌کنیم
  const escapedSep = sep.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  // حذف تمام جداکننده‌ها
  const cleaned = `${input}`.replace(new RegExp(escapedSep, "g"), "");

  // تبدیل به عدد (در صورت رشته‌ای خالی یا غیرقابل تبدیل، نتیجه NaN خواهد بود)
  const result = Number(cleaned);

  return isNaN(result) ? 0 : result;
}
/**
 * تبدیل مبلغ ریالی به حروف به‌تومان
 *
 * @param {number|string} rials  — مبلغ به ریال (عدد یا رشتهٔ عددی)
 * @returns {string}             — مبلغ به تومان به‌صورت حروف، مثال:
 *                                 "صد و بیست و سه هزار و چهارصد و پنجاه تومان"
 */
export function toTomanWords(rials) {
  // تبدیل ورودی به عدد و تقسیم بر 10 برای تبدیل به تومان
  const n = Math.floor(Number(rials) / 10);
  if (isNaN(n) || n <= 0) return "صفر تومان";

  const ones = [
    "صفر","یک","دو","سه","چهار","پنج","شش","هفت","هشت","نه"
  ];
  const teens = {
    10: "ده", 11: "یازده", 12: "دوازده", 13: "سیزده",
    14: "چهارده",15: "پانزده",16: "شانزده",
    17: "هفده",18: "هجده",19: "نوزده"
  };
  const tens = {
    20: "بیست",30: "سی",40: "چهل",50: "پنجاه",
    60: "شصت",70: "هفتاد",80: "هشتاد",90: "نود"
  };
  const hundreds = {
    1: "صد",2: "دویست",3: "سیصد",4: "چهارصد",
    5: "پانصد",6: "ششصد",7: "هفتصد",8: "هشتصد",9: "نهصد"
  };
  const scales = ["", "هزار", "میلیون", "میلیارد", "بیلیون"];

  // برای هر سه رقم یک بخش جدا می‌سازیم
  function threeDigitsToWords(num) {
    const h = Math.floor(num / 100);
    const rem = num % 100;
    let parts = [];

    if (h) parts.push(hundreds[h]);
    if (rem >= 10 && rem < 20) {
      parts.push(teens[rem]);
    } else {
      const t = Math.floor(rem / 10) * 10;
      const u = rem % 10;
      if (t) parts.push(tens[t]);
      if (u) parts.push(ones[u]);
    }
    return parts.join(" و ");
  }

  let words = [];
  let chunkIndex = 0;
  let value = n;

  while (value > 0) {
    const chunk = value % 1000;
    if (chunk) {
      const chunkWords = threeDigitsToWords(chunk);
      const scaleName = scales[chunkIndex];
      words.unshift(
        scaleName
          ? `${chunkWords} ${scaleName}`
          : chunkWords
      );
    }
    value = Math.floor(value / 1000);
    chunkIndex++;
  }

  return words.join(" و ") + " تومان";
}
