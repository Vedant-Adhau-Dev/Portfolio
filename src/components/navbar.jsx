import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Menubar from './menubar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen); // toggle visibility
  };

  return (
    <div className='nav'>
      <ul>
        <li>
          <img className="logo" src="/portfolio.jpeg" alt="logo" />
        </li>
        <NavLink className="logoText" to="/">Vedant Adhau Dev</NavLink>
      </ul>

      <ul className='ul-right'>
        {/* Mobile Menu Icon */}
        <div className="menu-container">
          <img
            className="menu"
            src={menuOpen ? "/assets/cross.svg" : "/assets/menu.svg"}
            alt="menu icon"
            onClick={handleMenuClick}
          />
        </div>

        {/* Desktop Links */}
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About Me</NavLink></li>
        <li><NavLink to="/skillset">Skillset</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/contact">Contact Me</NavLink></li>
      </ul>

      {/* Mobile Menu */}
      <div className={`menulist ${menuOpen ? "visible" : ""}`}>
        <Menubar setMenuOpen={setMenuOpen} />
      </div>
    </div>
  );
};

export default Navbar;
