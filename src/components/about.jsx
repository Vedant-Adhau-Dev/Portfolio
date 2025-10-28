import { useEffect, useState } from "react";
import "./about.css";

function About() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [lines, setLines] = useState([]);
  const commands = [
    "> Initializing human.exe...",
    "> Loading passions...",
    "> Installing creativity.dll",
    "> Updating me.env",
    "> Rendering Profile.card"
  ];



  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < commands.length) {
        setLines((prev) => [...prev, commands[i]]);
        console.log(i)
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowTerminal(false), 100); // wait a bit then hide
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      {showTerminal ? (
        <div className="terminal-window">
          {lines.map((line, index) => (
            <p key={index} className="terminal-line">{line}</p>
          ))}
          <span className="cursor">▌</span>
        </div>
      ) : (
        <div className="about-horizontal">
          <div className="avatar-side">
            <div className="avatar-circle">TW</div>
            <h2 className="glow-name">THEWRITER.EXE</h2>
          </div>

          <div className="data-side">
            <div className="data-line">
              <span className="label">ROLE</span>
              <span className="value">Frontend Developer / Story Crafter</span>
            </div>
            <div className="data-line">
              <span className="label">STACK</span>
              <span className="value">HTML • CSS • JavaScript • React</span>
            </div>
            <div className="data-line">
              <span className="label">ABILITY</span>
              <span className="value">Turning caffeine into code</span>
            </div>
            <div className="data-line">
              <span className="label">MISSION</span>
              <span className="value">Break comfort zones & build cool stuff</span>
            </div>
            <div className="data-line">
              <span className="label">LOCATION</span>
              <span className="value">Somewhere between logic & imagination</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
