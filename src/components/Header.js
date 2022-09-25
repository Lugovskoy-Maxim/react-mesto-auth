import React from 'react';
import headerLogo from '../Images/Vectorlogo.svg';

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="/">
        <img
          className="header__logo"
          alt="Логотип"
          src={headerLogo}
        />
      </a>
    </header>
  );
}

export default Header;