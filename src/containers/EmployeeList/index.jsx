import React, { useState } from "react";
import TitleCard from "@/components/TitleCard";
import RowEmplyee from "./RowEmployee";

function EmployeeList() {
  // لیست اولیه کارکنان به صورت state
  const [employees, setEmployees] = useState([
    {
      num: "1",
      personalCode: "EM123",
      position: "انباردار",
      name: "علیرضا",
      dateStart: "1/6/1404",
      status: false,
    },
    {
      num: "2",
      personalCode: "EM124",
      position: "مدیر",
      name: "رضا",
      dateStart: "2/6/1404",
      status: true,
    },
    {
      num: "3",
      personalCode: "EM125",
      position: "کارشناس",
      name: "سارا",
      dateStart: "3/6/1404",
      status: false,
    },
  ]);

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);

  // وضعیت ورودی‌های فرم کارمند جدید
  const [newEmployee, setNewEmployee] = useState({
    personalCode: "",
    name: "",
    position: "",
    dateStart: "",
    status: false,
  });

  // به‌روزرسانی فیلدهای فرم
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ذخیره کارمند جدید و اضافه کردن آن به لیست
  const handleAddNewEmployee = () => {
    // به صورت ساده می‌توان شماره ردیف (num) را به صورت خودکار افزایش داد.
    const newNum = (employees.length + 1).toString();
    const newEmp = {
      num: newNum,
      ...newEmployee,
    };
    setEmployees([...employees, newEmp]);
    // ریست کردن فرم
    setNewEmployee({
      personalCode: "",
      name: "",
      position: "",
      dateStart: "",
      status: false,
    });
    setShowAddModal(false);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-base-200 py-4 px-6">
      <TitleCard
        title="لیست کارکنان"
        leftBtn={true}
        handleBtn={() => setShowAddModal(true)}
        titleBtn={"افزودن کارمند جدید"}
      >
        <div className="overflow-x-auto h-[80vh]">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <th>کد</th>
                <th>نام</th>
                <th>سمت</th>
                <th>تاریخ شروع</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <RowEmplyee key={index} {...employee} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>کد</th>
                <th>نام</th>
                <th>سمت</th>
                <th>تاریخ شروع</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* مودال افزودن کارمند جدید */}
        {showAddModal && (
          <div
            className="modal modal-open"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAddModal(false);
            }}
          >
            <div className="modal-box relative">
              <h3 className="font-bold text-lg mb-4">افزودن کارمند جدید</h3>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">کد کارمند</span>
                </label>
                <input
                  type="text"
                  name="personalCode"
                  value={newEmployee.personalCode}
                  onChange={handleInputChange}
                  placeholder="مثلاً EM126"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">نام</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  placeholder="نام کارمند"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">سمت</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  placeholder="مثلاً مدیر"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">تاریخ شروع</span>
                </label>
                <input
                  type="text"
                  name="dateStart"
                  value={newEmployee.dateStart}
                  onChange={handleInputChange}
                  placeholder="به صورت شمسی مثلاً 1/6/1404"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-3">
                <label className="cursor-pointer label">
                  <span className="label-text">وضعیت فعال</span>
                  <input
                    type="checkbox"
                    name="status"
                    checked={newEmployee.status}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <div className="modal-action gap-2">
                <button className="btn" onClick={() => setShowAddModal(false)}>
                  انصراف
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddNewEmployee}
                >
                  ذخیره
                </button>
              </div>
            </div>
          </div>
        )}
      </TitleCard>
    </main>
  );
}

export default EmployeeList;
