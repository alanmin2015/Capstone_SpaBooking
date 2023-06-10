import React from "react";
import './Header.css';
import logoImage from '../../image/Logo-Title.jpg';

const Header = () => {
  return (
    <nav className="header">
      <div>
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="navBar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Bookings">
              Bookings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Weather">
              Weather
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Admin">
              Admin
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Account">
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
