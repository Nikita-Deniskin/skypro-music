import './NavMenu.css';
import { useState } from 'react';

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
    return (
        <nav className="main__nav nav">
          <div className="nav__logo logo">
            <img className="logo__image" src="img/logo.png" alt="logo" />
          </div>
          <button className="nav__burger burger" type="button" onClick={toggleVisibility}>
            <span className="burger__line" />
            <span className="burger__line" />
            <span className="burger__line" />
          </button>
          {visible && (
          <div className="nav__menu menu">
            <ul className="menu__list">
              <li className="menu__item">
                <a href="http://" className="menu__link">
                    Главное
                </a>
              </li>
              <li className="menu__item">
                <a href="http://" className="menu__link">
                  Мой плейлист
                </a>
              </li>
              <li className="menu__item">
                <a href="../signin.html" className="menu__link">
                  Войти
                </a>
              </li>
            </ul>
          </div>
           )}
        </nav>
    );
  };