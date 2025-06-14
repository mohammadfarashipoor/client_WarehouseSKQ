
function ModalBox(props) {
    const { children, modalId, closeBtn = false, closeBtnText = "" } = props
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop" onClick={()=>document.getElementById(modalId).close()}>
                {closeBtn && <button>{closeBtnText}</button>}
            </form>
        </dialog>)
}
export default ModalBox