import React from "react";

function Notification() {
  return (
    <div className="modal" role="dialog">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">This modal works with a hidden checkbox!</p>
      </div>
      <label className="modal-backdrop" htmlFor="right-sidebar-drawer">
        Close
      </label>
    </div>
  );
}

export default Notification;
