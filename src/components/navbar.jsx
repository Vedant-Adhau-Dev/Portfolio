import React from 'react'
import './navbar.css'

const navbar = () => {
    return (
        <div className='nav'>
            <ul><li><img className="logo" src="../../public/portfolio.jpeg" alt="" /></li><h2>Vedant Adhau Dev</h2></ul>
            <ul className='ul-right'>
                <div><img className='menu' src="../../src/assets/menu.svg" alt="" /></div>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="#">Skillset</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact Me</a></li>
            </ul>
        </div>
    )
}

export default navbar
