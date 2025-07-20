import { isoToJalali } from "../../utils/date";

function RowNotification(props) {
    const { title, message, isActive, markAsRead, postedAt, selected, onSelect } = props
    return (
        <tr className={`${!markAsRead ? 'font-bold' : ''}`}>
            <th>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selected}
                        onChange={onSelect}
                    />
                </label>
            </th>
            <td>
                <p >{title}</p>
            </td>
            <td>
                <p>
                    {message}
                </p>
            </td>
            <td>
                {isActive ? (
                    <span className="block btn-circle w-2 h-2 bg-green-700"></span>
                ) : (
                    <span className="block btn-circle w-2 h-2 bg-red-700"></span>
                )}
            </td>
            <th>
                <span>{`${isoToJalali(postedAt)}`}</span>
            </th>
        </tr>
    )
}
export default RowNotification;