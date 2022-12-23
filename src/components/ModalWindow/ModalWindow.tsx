import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import ReactPortal from '../ReactPortal';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import React from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function ModalWindow({ children, onClose }: ModalProps) {
  return (
    <>
      <ReactPortal wrapperId='backdrop-root'>
        <ModalBackdrop />
      </ReactPortal>
      <ReactPortal wrapperId='overlay-root'>
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>
      </ReactPortal>
    </>
  );
}

export default ModalWindow;
