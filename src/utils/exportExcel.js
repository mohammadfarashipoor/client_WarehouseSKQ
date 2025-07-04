// src/utils/exportExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * صادر کردن یک جدول HTML به فایل اکسل
 *
 * @param {HTMLTableElement} tableEl   – رفرنس به <table> در DOM
 * @param {Object} options
 * @param {string} options.fileName    – نام فایل خروجی (بدون فرمت)
 * @param {string} [options.sheetName] – نام شیت داخل فایل اکسل
 */
export function exportTableToExcel(
  tableEl,
  { fileName, sheetName = 'Sheet1' }
) {
  if (!tableEl) {
    console.warn('exportTableToExcel: table element is null');
    return;
  }

  // 1. ساخت Workbook و Worksheet از جدول
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(tableEl);

  // 2. الحاق Worksheet به Workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // 3. نوشتن Workbook به ArrayBuffer
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // 4. ذخیره فایل
  saveAs(
    new Blob([wbout], { type: 'application/octet-stream' }),
    `${fileName}.xlsx`
  );
}
