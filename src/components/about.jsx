import { useState, useEffect, useRef } from "react";
import "./about.css";

export default function About() {
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
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
    typeResponse(command, response);
  };

  const typeResponse = (command, text) => {
    setIsTyping(true);
    let i = 0;
    const speed = 25;

    setOutput((prev) => [...prev, { command, response: "" }]);

    const interval = setInterval(() => {
      setOutput((prev) => {
        const newOutput = [...prev];
        const lastLine = newOutput[newOutput.length - 1];
        if (i < text.length) {
          lastLine.response = text.slice(0, i + 1);
        }
        return newOutput;
      });
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping || !currentLine.trim()) return;
    handleCommand(currentLine);
    setCurrentLine("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output, currentLine]);

  // ✅ Mobile viewport handling (fixes slide-up issue)
  useEffect(() => {
    const updateVh = () => {
      const vh = window.visualViewport
        ? window.visualViewport.height * 0.01
        : window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateVh);
      window.visualViewport.addEventListener("scroll", updateVh);
    } else {
      window.addEventListener("resize", updateVh);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateVh);
        window.visualViewport.removeEventListener("scroll", updateVh);
      } else {
        window.removeEventListener("resize", updateVh);
      }
    };
  }, []);

  // ✅ Focus scroll correction for mobile
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 250);
    };
    const input = inputRef.current;
    input.addEventListener("focus", handleFocus);
    return () => input.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div className="terminal-real">
      <div className="terminal-header">About Me Terminal (Type "help")</div>

      <div className="terminal-output" onClick={() => inputRef.current.focus()}>
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
            disabled={isTyping}
          />
        </form>

        <div ref={endRef} />
      </div>
    </div>
  );
}
