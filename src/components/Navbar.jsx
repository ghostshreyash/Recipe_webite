import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <nav className="navbar container">
      <img src='./assets/logo.png' alt="Recipe Wizard Logo" className="logo" />
      <div className="nav-items">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </div>
        <div className="user-info">
          {user ? (
            <>
              <img
                src='./assets/avatar.png'
                alt="User Avatar"
                className="user-avatar"
                onClick={toggleDropdown}
              />
              <span className="username">{user.username}</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/" className="dropdown-item" onClick={closeDropdown}>Home</Link>
                  <Link to="/recipes" className="dropdown-item" onClick={closeDropdown}>Recipes</Link>
                  <p className="dropdown-item" onClick={() => { onLogout(); closeDropdown(); }}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
