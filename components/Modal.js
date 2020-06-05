

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="closeButtonContainer"><button onClick={handleClose} className="closeButton">close</button></div>
        </section>
      </div>
    );
  };

export default Modal;