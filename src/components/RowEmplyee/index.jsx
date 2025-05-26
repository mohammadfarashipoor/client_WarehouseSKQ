import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function RowEmplyee({ num, personalCode, position, name, dateStart, status }) {
  return (
    <tr>
      <th>{num}</th>
      <td>{personalCode}</td>
      <td>{name}</td>
      <td>{position}</td>
      <td>{dateStart}</td>
      <td>
        {status ? (
          <span className="block btn-circle w-2 h-2 bg-green-700"></span>
        ) : (
          <span className="block btn-circle w-2 h-2 bg-red-700"></span>
        )}
      </td>
      <td className="">
        <div className="dropdown dropdown-end ">
          <button className="btn-ghost rounded-md">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
          <ul className="menu menu-compact dropdown-content  shadow bg-base-200 rounded-box w-52 z-10">
            <li className="justify-between">
              <span> تغییر وضعیت</span>
            </li>

            <li>
              <span>سوابق</span>
            </li>
            <li>
              <span>قرارداد</span>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default RowEmplyee;
