import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../Images/Vectorlogo.svg";

function Header(props) {
const location = useLocation();

  return (
    <header className="header">
      <>
      <a className="header__link" href="/mesto-react">
        <img className="header__logo" alt="Логотип" src={headerLogo} />
      </a>
      </>
      <div className="header__navInfo">
        {props.onlogin ? (
          <>
            <p className="header__email">{props.email}</p>
            <Link
              className="header__link header__link_logout"
              to="/signin"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </>
        ) : (
          <>
            {location.pathname === "/signup" ? (<Link className="header__link" to="/signin">Войти</Link>) : (<Link className="header__link" to="/signup">Регистрация</Link>)}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
