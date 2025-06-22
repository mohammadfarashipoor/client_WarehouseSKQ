import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalBox from "../ModalBox";
import { useNavigate } from "react-router";
import { onDownload } from "../../utils/storage";

function RowEmplyee({ num, personalCode, position, name, contractURL, status, handleEditEmployee }) {
  const navigate = useNavigate();

  const handleReviewRecords = () => {
    navigate(`/employee/report:${personalCode}`)
  }
  const handleContract = () => {
    onDownload(contractURL)
    // document.getElementById('modalContract').showModal()
  }
  const handleEdit = () => {
    handleEditEmployee({ personalCode, position, name, contractURL	, status })
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
              <span>حذف</span>
            </li>
          </ul>
        </div>
        <ModalBox CloseBtn={true} CloseBtnText={<XMarkIcon className="w-5 h-5" />} modalId="modalContract">
          <img src={contractURL	} alt={personalCode} />
        </ModalBox>
      </td>
    </tr>
  );
}

export default RowEmplyee;
