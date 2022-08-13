import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const { title, content, actions, onDismiss, isOpen } = props;
  return ReactDOM.createPortal(
    <div
      onClick={onDismiss}
      className={`modal modal__bg ${isOpen ? "" : "visible"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__body">
        <div className="modal__header">{title}</div>
        <div className="modal__content">{content}</div>
        <div className="modal__actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
