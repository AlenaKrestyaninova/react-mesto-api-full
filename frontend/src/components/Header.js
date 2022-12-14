import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';


function Header({ loggedIn, email, onLogout }) {
  const location = useLocation();
  
  return (
    <header className="header">
        <img src={headerLogo} alt="лого" className="header__logo" />
        <div className="header__container">
          {location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          )}
          {location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          )}
          {loggedIn && (
            <div className="header__info">
              <p className="header__email">{email}</p>
              <Link to="/signin" onClick={onLogout} className="header__button">
                Выйти
              </Link>
            </div>
          )}
        </div>
    </header>
  );
}

export default Header;