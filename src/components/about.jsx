import { useState, useEffect, useRef } from "react";
import "./about.css";

export default function About() {
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
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
    handleCommand(currentLine);
    setCurrentLine("");
  };

  // Scroll only when new output is added (not while typing)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Fix for mobile keyboard resizing issue
  useEffect(() => {
    const fixViewport = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    fixViewport();
    window.addEventListener("resize", fixViewport);
    window.visualViewport?.addEventListener("resize", fixViewport);

    return () => {
      window.removeEventListener("resize", fixViewport);
      window.visualViewport?.removeEventListener("resize", fixViewport);
    };
  }, []);

  // Keep keyboard stable on mobile without auto-scrolling
  useEffect(() => {
    const input = inputRef.current;

    const handleFocus = () => {
      // no auto-scroll here
      document.body.style.overflow = "hidden";
    };

    const handleBlur = () => {
      document.body.style.overflow = "auto";
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div className="terminal-container" ref={terminalRef}>
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
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}
