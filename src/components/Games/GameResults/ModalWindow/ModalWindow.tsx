import React, { ReactNode } from 'react';
import './ModalWindow.scss';

interface IModalWindow {
  children: ReactNode;
}

const ModalWindow = ({ children }: IModalWindow) => (
  <div className="modal-window__bg">
    <div className="modal-window__content">
      {children}
    </div>
  </div>
);

export default ModalWindow;
