import React from 'react';
import './Hamburger.scss';

interface IHamburger {
  onClick: () => void;
  isOpen: boolean;
}

const Hamburger = ({ onClick, isOpen }: IHamburger) => (
  <div className="hamburger">
    <div
      className={`hamburger__inner ${isOpen ? 'hamburger_open' : ''}`}
      onClick={onClick}
      onKeyDown={() => null}
      role="button"
      tabIndex={0}
    >
      <svg viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
        <path
          className="hamburger__path line--1"
          d="M0 40h62c13 0 6 28-4 18L35 35"
        />
        <path className="hamburger__path line--2" d="M0 50h70" />
        <path
          className="hamburger__path line--3"
          d="M0 60h62c13 0 6-28-4-18L35 65"
        />
      </svg>
    </div>
  </div>
);

export default Hamburger;
