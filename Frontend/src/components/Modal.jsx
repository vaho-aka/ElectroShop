import React from 'react';
import ReactDOM from 'react-dom';
import { ClickAwayListener } from '@mui/material';

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 bg-[#030712bf] flex items-center justify-center h-full w-full z-20  animate-slide-down">
      <ClickAwayListener onClickAway={onClose}>
        <div className="p-4 rounded-md bg-white min-w-[600px]">{children}</div>
      </ClickAwayListener>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
