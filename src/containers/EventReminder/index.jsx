import { useEffect, useMemo, useState } from "react";
import DatePickerModal from "../../components/DatePickerModal";
import { CalendarIcon } from "@heroicons/react/24/outline";
import actions from "@/context/actions";
import { connect } from "react-redux";
import EventModal from "../../components/EventModal";
import { dateObjectToISO } from "../../utils/date";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";

function EventReminder(props) {
    const { fetchEvents, fetchEventsByDate, fetchEventsByDateHandle, newEventChange, formErrors, newEventFormData, newEventHandle, fetchHandleEvents, deleteEventHandle, editEventHandle, } = props
    const [pickDateVisible, setPickDateVisible] = useState(false);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        fetchHandleEvents()
    }, [])
    useEffect(() => {

        fetchEventsByDateHandle(new DateObject(selectedDate)
            .convert(persian, persian_en)
            .format("YYYY/MM/DD"))
    }, [selectedDate, fetchEvents])
    // برای بررسی سریع وجود رویداد در یک روز
    const eventsByDate = useMemo(() => {
        const map = {};
        fetchEvents.forEach(evt => {
            // فرض: evt.date یک ISO string است
            const p = new DateObject(evt.date)
                .convert(persian, persian_fa);
            map[p.format("YYYY/MM/DD")] = true;
        });
        return map;
    }, [fetchEvents]);

    // انتخاب تاریخ → باز شدن مودال رویداد
    const handleDateSelect = date => {
        setSelectedDate(date);
        setEventModalVisible(true);
    };

    // ذخیره رویداد
    const handleEventSave = async () => {
        newEventChange('date', new DateObject(selectedDate)
            .convert(persian, persian_en)
            .format("YYYY/MM/DD"))
        const isErrorFeild = await newEventHandle()
        if (isErrorFeild) {
            setEventModalVisible(false);
            setSelectedDate(null);
        }
    };
    return (
        <div className="relative p-3">
            <CalendarIcon
                className="w-7 h-7 cursor-pointer"
                onClick={() => setPickDateVisible(true)}
            />

            <DatePickerModal
                visible={pickDateVisible}
                onSelectDate={handleDateSelect}
                onClose={() => setPickDateVisible(false)}
                eventsByDate={eventsByDate}
            />

            <EventModal
                visible={eventModalVisible}
                selectedDate={selectedDate}
                events={fetchEventsByDate}
                newEventChange={newEventChange}
                formErrors={formErrors}
                newEventFormData={newEventFormData}
                onSave={handleEventSave}
                onClose={() => setEventModalVisible(false)}
                deleteEventHandle={deleteEventHandle}
                editEventHandle={editEventHandle}
            />
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        newEventFormData: state.event.newEventFormData,
        fetchEvents: state.event.fetchEvents,
        fetchEventsByDate: state.event.fetchEventsByDate,
        formErrors: state.event.formErrors,
        isLoading: state.event.isLoading,
    };
};
export default connect(mapStateToProps, actions)(EventReminder);
