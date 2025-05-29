import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function RowCustomer({ num, personalCode, phoneNumber, name, address,  }) {
  return (
    <tr>
      <th>{num}</th>
      <td>{personalCode}</td>
      <td>{name}</td>
      <td>{phoneNumber}</td>
      <td>{address}</td>
     
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

export default RowCustomer;
