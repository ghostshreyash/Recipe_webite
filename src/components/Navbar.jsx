import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="container" style={{ background: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="./assets/logo.png" alt="Recipe Wizard Logo" />
        <div style={{ marginLeft: '20px', display: 'flex' }}>
          <Link to="/" style={{ margin: '0 100px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize:'30px' }}>Home</Link>
          <Link to="/recipes" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '30px' }}>Recipes</Link>
        </div>
      </div>
      <div>
        {user ? ( // If user is logged in
          <div style={{ position: 'relative' }}>
            <img
              src="./assets/avatar.png"
              alt="User Avatar"
              style={{ width: '40px', borderRadius: '50%', cursor: 'pointer' }}
              onClick={toggleDropdown}
            />
            <span style={{ marginLeft: '10px', fontWeight: 'bold', alignItems:'center' }}>{user.username}</span>
            {showDropdown && (
              <div className="dropdown-menu" style={{ position: 'absolute', right: 0, top: '50px', background: '#d45b0a', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                <p style={{ margin: 0, cursor: 'pointer' }} onClick={onLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
