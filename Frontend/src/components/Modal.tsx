import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ClickAwayListener } from '@mui/material';

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 bg-[#030712bf] h-full w-full z-10"></div>
  );
};

const ModalOverlay: React.FC<{ children: ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 bg-transparent flex items-center justify-center h-full w-full z-20  animate-slide-down">
      <ClickAwayListener onClickAway={onClose}>
        <div className="p-4 rounded-md bg-white ">{children}</div>
      </ClickAwayListener>
    </div>
  );
};

const portalElement = document.getElementById('overlays') as HTMLDivElement;

const Modal: React.FC<{ children: ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default React.memo(Modal);
