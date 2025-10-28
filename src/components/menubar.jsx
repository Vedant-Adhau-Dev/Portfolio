import React from 'react';
import { NavLink } from 'react-router-dom';
import "./menubar.css";

const Menubar = ({ setMenuOpen }) => {
  const handleClick = () => setMenuOpen(false); // close when link clicked

  return (
    <ul className="menu-links">
      <li><NavLink to="/" onClick={handleClick}>Home</NavLink></li>
      <li><NavLink to="/about" onClick={handleClick}>About Me</NavLink></li>
      <li><NavLink to="/skillset" onClick={handleClick}>Skillset</NavLink></li>
      <li><NavLink to="/projects" onClick={handleClick}>Projects</NavLink></li>
      <li><NavLink to="/contact" onClick={handleClick}>Contact Me</NavLink></li>
    </ul>
  );
};

export default Menubar;
