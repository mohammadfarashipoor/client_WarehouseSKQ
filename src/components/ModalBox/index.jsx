
function ModalBox(props) {
    const { children, modalId, closeBtnText = "", modalStyle = "" } = props
    return (
        <dialog id={modalId} className={`modal ${modalStyle}`}>
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop" onClick={() => document.getElementById(modalId).close()}>
                {closeBtnText && <button>{closeBtnText}</button>}
            </form>
        </dialog>)
}
export default ModalBox