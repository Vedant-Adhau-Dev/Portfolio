import { useEffect, useRef, useState } from "react";
import "./about.css";

export default function About() {
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const inputRef = useRef(null);
  const termRef = useRef(null);
  const endRef = useRef(null);

  const commands = {
    role: ">_ Web Developer",
    stack: ">_ HTML, CSS, JavaScript, React, Node.js, Express.js, Tailwind",
    ability: ">_ Turning ideas into clean, creative, and functional code.",
    mission: ">_ Creating impactful and meaningful experiences through code.",
    location: ">_ Somewhere between logic & imagination",
    help: ">_ Available commands: role, stack, ability, mission, location, clear",
  };

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setOutput([]);
      return;
    }
    const response = commands[command] || `Command not found: ${command}`;
    setOutput((prev) => [...prev, { command, response }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLine.trim()) return;
    handleCommand(currentLine);
    setCurrentLine("");
  };

  // Scroll only when new lines appear
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [output]);

  // Adjust visible height based on navbar height and keyboard
  useEffect(() => {
    const term = termRef.current;
    const updateHeight = () => {
      const navbar = document.querySelector(".navbar"); // match your navbar class
      const navHeight = navbar ? navbar.offsetHeight : 60;
      const visibleHeight =
        (window.visualViewport?.height || window.innerHeight) - navHeight;
      term.style.height = `${visibleHeight}px`;
    };
    updateHeight();
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="terminal-page">
      <div className="terminal-container" ref={termRef}>
        <div className="terminal-header">About Me Terminal — Type "help"</div>

        <div className="terminal-body" onClick={() => inputRef.current.focus()}>
          {output.map((line, i) => (
            <div key={i} className="terminal-line">
              <span className="prompt">$ {line.command}</span>
              <div className="response">{line.response}</div>
            </div>
          ))}

          <form className="terminal-line current" onSubmit={handleSubmit}>
            <span className="prompt">$ </span>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              autoComplete="off"
              spellCheck="false"
              inputMode="text"
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
