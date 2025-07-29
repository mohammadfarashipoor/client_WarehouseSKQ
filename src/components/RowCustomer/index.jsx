import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import ModalBox from "../ModalBox";
import MapLink from "../MapLink";

function RowCustomer({ _id, personalCode, mobile, name, address, status, location, handleEditCustomerModal, deletCustomerHandle }) {
  const handleEdit = () => {
    handleEditCustomerModal({ _id, personalCode, mobile, name, address, location, status })
  }
  return (
    <tr>
      <th></th>
      <td>{personalCode}</td>
      <td>{name}</td>
      <td>{mobile}</td>
      <td>
        {status ? (
          <span className="block btn-circle w-2 h-2 bg-green-700"></span>
        ) : (
          <span className="block btn-circle w-2 h-2 bg-red-700"></span>
        )}
      </td>
      <td><MapLink lat={location.coordinates[0]} lng={location.coordinates[1]}>{address}</MapLink></td>

      <td className="">
        <div className="dropdown dropdown-end ">
          <button className="btn-ghost rounded-md">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
          <ul className="menu menu-compact dropdown-content  shadow bg-base-200 rounded-box w-52 z-10">
            <li className="justify-between">
              <button onClick={handleEdit}>ویرایش</button>
            </li>

            <li>
              <button onClick={() => document.getElementById('modalDelete').showModal()}>حذف</button>
            </li>
          </ul>
        </div>
        <ModalBox modalId="modalDelete" >
          <div className="flex flex-col text-center gap-2">
            <p className="text-base">{name ? `آیا از حذف ${name} اطمینان دارید؟ ` : `آیا از حذف اطمینان دارید؟ `}</p>
            <div className="flex justify-center gap-2">
              <button className="btn btn-outline btn-error" onClick={() => deletCustomerHandle(_id)}>حذف</button>
              <button className="btn" onClick={() => document.getElementById('modalDelete').close()} >انصراف</button>
            </div>
          </div>
        </ModalBox>
      </td>
    </tr>
  );
}

export default RowCustomer;
