import React, { useContext } from 'react';
import './Header.css';
import logoImage from '../../image/Logo-Title.jpg';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, userId } = useContext(AuthContext); // Get userId from AuthContext
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
            <Link className="nav-link" to={`/Home/${userId}`}> {/* Use Link and add userId */}
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/Bookings/${userId}`}> {/* Use Link and add userId */}
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/Weather/${userId}`}> {/* Use Link and add userId */}
              Weather
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/Account/${userId}`}> {/* Use Link and add userId */}
              Account
            </Link>
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
