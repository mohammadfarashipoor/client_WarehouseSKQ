import Textarea from "@/components/Input/Textarea";
import InputText from "@/components/Input/InputText";
import { useMemo, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
function EventModal(props) {
    const {
        visible,
        selectedDate,
        events,
        onSave,
        onClose,
        formErrors,
        newEventChange,
        newEventFormData,
        deleteEventHandle,
        editEventHandle
    } = props
    const [editModeId, setEditModeId] = useState("")
    const formattedDate = useMemo(() => {
        if (!selectedDate) return "";
        return new DateObject(selectedDate)
            .convert(persian, persian_fa)
            .format("YYYY/MM/DD");
    }, [selectedDate]);
    const editEvent = (event) => {
        setEditModeId(event["_id"])
        for (const item in event) {
            newEventChange(item, event[item])
        }
    }
    const onSubmit = () => {
        try {
            if (editModeId) { editEventHandle(editModeId) }
            else { onSave() }
            setEditModeId("")
        } catch (error) {
            console.log(error)
        }

    }
    const onCloseHandle = () => {
        newEventChange("title", "")
        newEventChange("description", "")
        onClose()
    }
    if (!visible) return null;
    return (
        <div className="modal modal-open" onClick={onClose}>
            <div className="modal-box relative" onClick={e => e.stopPropagation()}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="text-lg font-bold mb-4 text-center">
                    افزودن رویداد – {formattedDate}
                </h3>

                <InputText
                    label="عنوان رویداد"
                    name="title"
                    error={formErrors["title"]}
                    value={newEventFormData.title}
                    onInputChange={(name, value) => {
                        newEventChange(name, value);
                    }}
                />

                <Textarea
                    label="توضیحات"
                    name="description"
                    value={newEventFormData.description}
                    onInputChange={(name, value) => {
                        newEventChange(name, value);
                    }}
                />

                {events.length > 0 && (
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">رویدادهای ثبت‌شده:</h4>
                        <ul className="list-none space-y-2">
                            {events.map((evt, i) => (
                                <li key={i}>
                                    <details className="collapse bg-base-200">
                                        <summary className="collapse-title !flex justify-between group">
                                            <span className="flex-auto">{evt.date}{" "}
                                                – {evt.title}</span>
                                            <button className="hidden btn-outline rounded-full p-1 group-hover:inline" onClick={() => editEvent(evt)}><PencilIcon className="w-5 h-5" /></button>
                                            <button className="hidden btn-outline btn-error rounded-full p-1 mr-2 group-hover:inline" onClick={() => deleteEventHandle(evt._id)}><TrashIcon className="w-5 h-5" /></button>
                                        </summary>
                                        <div className="collapse-content">
                                            <p>{evt.description}</p>
                                        </div>
                                    </details>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="modal-action flex justify-between mt-4">
                    <button className="btn btn-primary" onClick={onSubmit}>
                        {editModeId ? "ویرایش" : "ذخیره"}
                    </button>
                    <button className="btn" onClick={onCloseHandle}>انصراف</button>
                </div>
            </div>
        </div>
    );
}
export default EventModal