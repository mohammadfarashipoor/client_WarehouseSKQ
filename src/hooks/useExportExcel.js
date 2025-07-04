// src/hooks/useExportExcel.js
import { useCallback } from 'react';
import { exportTableToExcel } from '../utils/exportExcel';

/**
 * هوک برای خروجی گرفتن از یک جدول HTML
 *
 * @param {React.RefObject<HTMLTableElement>} tableRef 
 * @param {Object} options 
 * @param {string} options.fileName 
 * @param {string} [options.sheetName]
 */
export function useExportExcel(tableRef, options) {
  return useCallback(() => {
    exportTableToExcel(tableRef.current, options);
  }, [tableRef, options]);
}
