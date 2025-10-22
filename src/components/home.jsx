import React from 'react'
import "./home.css"

const home = () => {
    return (
        <div className="fullBox">
            <div className='mainBox'>
                <div className="leftBox">
                    <div className="start">
                        <h1>Hi, I'm Vedant Adhau</h1>
                        <h2>Web Developer</h2>
                    </div>
                    <div className="mid">
                        <p>I’m a passionate and curious learner who loves exploring software development and creating meaningful digital solutions. I enjoy solving problems, learning new technologies, and turning ideas into functional, user-friendly experiences.</p>
                    </div>
                    <div className="end">
                        <button>Hire Me</button>
                        <button>Lets Talk</button>
                    </div>
                </div>
                <div className="rightBox">
                    <img className='me' src="../../src/assets/profile-pic.png" alt="Vedant Adhau" />
                </div>
            </div>
        </div>
    )
}

export default home
