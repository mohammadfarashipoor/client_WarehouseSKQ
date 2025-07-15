import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";

function DatePickerModal(props) {
    const {
        visible,
        onSelectDate,
        onClose,
        eventsByDate
    } = props
    const [currentMonth, setCurrentMonth] = useState(
        new DateObject({ calendar: persian, locale: persian_fa })
    );
    if (!visible) return null;
    return (
        <div className="modal modal-open" onClick={onClose}>
            <div className="modal-box w-auto p-4" onClick={e => e.stopPropagation()}>
                <Calendar
                    calendar={persian}
                    locale={persian_en}
                    onChange={onSelectDate}
                    onMonthChange={d => setCurrentMonth(new DateObject(d)
                        .convert(persian, persian_en)
                    )}
                    mapDays={({ date }) => {
                        // فقط روزهای ماه جاری
                        if (date.month.number !== currentMonth.month.number) {
                            return {};
                        }
                        // کلید Jalali
                        const key = date.format("YYYY/MM/DD");  
                        const hasEvent = eventsByDate[key];
                        return {
                            className: hasEvent ? "has-event" : "",
                            children: (
                                <div className="calendar-day-content">
                                    {date.day}
                                    {hasEvent && (
                                        <span className="!top-[20px] text-rose-500">●</span>
                                    )}
                                </div>
                            )
                        };
                    }}
                />
            </div>
        </div>
    )
}
export default DatePickerModal;
