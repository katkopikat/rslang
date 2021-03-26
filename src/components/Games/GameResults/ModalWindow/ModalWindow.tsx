import React from 'react';
import './ModalWindow.scss';

const ModalWindow: React.FC = ( props ) => (
  <div className='modal-window__bg'>
    <div className='modal-window__content'>
      {props.children}
    </div>
  </div>
);

export default ModalWindow;
