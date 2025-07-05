export function parseTimeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }
  
  /**
   * تعداد کل دقیقه را به فرمت "{ساعت}h {دقیقه}m" یا شیء {hours, minutes} برمی‌گرداند
   */
export function formatMinutes(mins) {
    const hours   = Math.floor(mins / 60);
    const minutes = mins % 60;
    if(minutes){
        return `${ hours }:${ minutes }`;
    }
    return `${ hours }`;
  }
  
  /**
   * محاسبه ساعات مفید و اضافه‌کاری
   * @param {string} start - "HH:mm"
   * @param {string} end   - "HH:mm"
   * @param {number} breakMin - دقیقه مرخصی
   * @param {number} standardDayMin - استاندارد روز کاری (مثلاً 8*60)
   */
export function calculateWorkTimes(start, end, breakMin, standardDayMin = 8*60) {
    const startMin = parseTimeToMinutes(start);
    const endMin   = parseTimeToMinutes(end);
    let workedMin  = endMin - startMin - breakMin;
  
    if (workedMin < 0) workedMin = 0;  // برای ایمن‌سازی
  
    const overtimeMin = Math.max(0, workedMin - standardDayMin);
    workedMin = workedMin - overtimeMin
    return {
      worked: workedMin,
      overtime: overtimeMin
    };
  }