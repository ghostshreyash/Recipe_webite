import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return ( 
        <nav className="container" style={{ background: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="./src/assets/logo.png" alt="Recipe Wizard Logo" />
                <div style={{ marginLeft: '20px', display: 'flex' }}>
                    <Link to="/" style={{ margin: '0 70px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize:'30px' }}>Home</Link>
                    <Link to="/recipes" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '30px' }}>Recipes</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
