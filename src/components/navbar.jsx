import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const navbar = () => {
    return (
        <div className='nav'>
            <ul><li><img className="logo" src="../../public/portfolio.jpeg" alt="" /></li><NavLink className="logoText" to="/">Vedant Adhau Dev</NavLink></ul>
            <ul className='ul-right'>
                <div><img className='menu' src="../../src/assets/menu.svg" alt="" /></div>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About Me</NavLink></li>
                <li><NavLink to="/skillset">Skillset</NavLink></li>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/contact">Contact Me</NavLink></li>
            </ul>
        </div>
    )
}

export default navbar
