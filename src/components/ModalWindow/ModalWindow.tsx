import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import ReactPortal from '../ReactPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';

function ModalWindow({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactPortal wrapperId='backdrop-root'>
        <ModalBackdrop />
      </ReactPortal>
      <ReactPortal wrapperId='overlay-rootxs'>
        <ModalOverlay>{children}</ModalOverlay>
      </ReactPortal>
    </>
  );
}

export default ModalWindow;
