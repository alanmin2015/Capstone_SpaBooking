import React, { useContext } from 'react';
import './Header.css';
import logoImage from '../../image/Logo-Title.jpg';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };
  return (
    <nav className="header">
      <div>
        <img src={logoImage} alt="Logo" />
      </div>
      {isAuthenticated && (
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
          <li className="nav-item">
            <button className="nav-link logout-btn"  onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
       )}
    </nav>
  );
};

export default Header;
