import React, { useMemo } from "react";

const DOTS = "...";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,      // تعداد صفحات نمایش داده‌شده قبل/بعد از current
  className = ""         // امکان اضافه‌کردن کلاس دلخواه والد
}) {
  // محاسبه‌ لیست صفحات (شامل … وقتی لازم باشد)
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const leftSiblingIndex  = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots  = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex  = totalPages;
    let pages = [];

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // صفحات از 1 تا (2*sibling+3)
      const leftItemCount = 2 * siblingCount + 3;
      pages = [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        DOTS,
        lastPageIndex
      ];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      // صفحات از (total - (2*sibling+2)) تا total
      const rightItemCount = 2 * siblingCount + 3;
      pages = [
        firstPageIndex,
        DOTS,
        ...Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + 1 + i
        )
      ];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      // صفحات میان‌افزار با … در هر دو سمت
      pages = [
        firstPageIndex,
        DOTS,
        ...Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        ),
        DOTS,
        lastPageIndex
      ];
    }

    return pages;
  }, [currentPage, totalPages, siblingCount]);

  // اگر فقط یک صفحه وجود دارد یا ماهیت pagination نامعتبر است
  if (paginationRange.length < 2) return null;

  return (
    <div className={`btn-group flex justify-center flex-wrap gap-1 ${className}`}>
      {/* اولین و قبلی */}
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        «
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {/* دکمه‌های شماره صفحات */}
      {paginationRange.map((page, idx) =>
        page === DOTS ? (
          <button key={idx} className="btn btn-sm btn-disabled">
            {DOTS}
          </button>
        ) : (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* بعدی و آخر */}
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
