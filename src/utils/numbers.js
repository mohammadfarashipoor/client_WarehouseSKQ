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