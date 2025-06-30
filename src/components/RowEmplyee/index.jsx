import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalBox from "../ModalBox";
import { useNavigate } from "react-router";
import { onDownload } from "../../utils/storage";

function RowEmplyee(props) {
  const { _id, num, personalCode, position, name, contractURL, status, contractPath, handleEditEmployeeModal, deleteEmployeeHandle } = props
  const navigate = useNavigate();

  const handleReviewRecords = () => {
    navigate(`/employee/report:${personalCode}`)
  }
  const handleContract = () => {
    onDownload(contractURL)
  }
  const handleEdit = () => {
    handleEditEmployeeModal({ _id, personalCode, position, name, contractURL, contractPath, status })
  }
  return (
    <tr>
      <th>{num}</th>
      <td>{personalCode}</td>
      <td>{name}</td>
      <td>{position}</td>
      <td>
        {status ? (
          <span className="block btn-circle w-2 h-2 bg-green-700"></span>
        ) : (
          <span className="block btn-circle w-2 h-2 bg-red-700"></span>
        )}
      </td>
      <td className="">
        <div className="dropdown dropdown-end">
          <button className="btn-ghost rounded-md">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
          <ul className="menu menu-compact dropdown-content  shadow bg-base-200 rounded-box w-52 z-10">
            <li>
              <button onClick={handleReviewRecords}>بررسی سوابق</button>
            </li>
            <li >
              <button onClick={handleContract}>شرح قرارداد</button>
            </li>
            <li >
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
              <button className="btn btn-outline btn-error" onClick={() => deleteEmployeeHandle(_id, contractURL)}>حذف</button>
              <button className="btn" onClick={() => document.getElementById('modalDelete').close()} >انصراف</button>
            </div>
          </div>
        </ModalBox>
      </td>
    </tr>
  );
}

export default RowEmplyee;
