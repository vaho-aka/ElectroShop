import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ClickAwayListener } from '@mui/material';
import { Transition } from '@headlessui/react';

const Backdrop: React.FC<{ showModal: boolean }> = ({ showModal }) => {
  return (
    <Transition
      show={showModal}
      as="div"
      className="fixed top-0 left-0 bg-[#030712bf] h-full w-full z-10"
    ></Transition>
  );
};

const ModalOverlay: React.FC<{
  children: ReactNode;
  showModal: boolean;
  onClose: () => void;
}> = ({ children, onClose, showModal }) => {
  return (
    <Transition
      as="div"
      show={showModal}
      enter="transition duration-250 ease-in"
      enterFrom="-translate-y-12 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition duration-100 ease-out"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-12 opacity-0"
      className="fixed top-0 left-0 bg-transparent flex items-center justify-center h-full w-full z-20"
    >
      <ClickAwayListener onClickAway={onClose}>
        <div className="p-4 rounded-md bg-white sm:min-w-[500px]">
          {children}
        </div>
      </ClickAwayListener>
    </Transition>
  );
};

const portalElement = document.getElementById('overlays') as HTMLDivElement;

const Modal: React.FC<{
  children: ReactNode;
  showModal: boolean;
  onClose: () => void;
}> = ({ children, onClose, showModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop showModal={showModal} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay showModal={showModal} onClose={onClose}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default React.memo(Modal);
