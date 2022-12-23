import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  wrapperId: string;
};

function ReactPortal({ children, wrapperId }: PortalProps) {
  let portalElement = document.getElementById(wrapperId);
  if (!portalElement) {
    portalElement = createWrapperAndAppendToBody(wrapperId);
  }
  return createPortal(children, portalElement);
}

export default ReactPortal;

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
