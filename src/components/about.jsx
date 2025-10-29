import { useState, useEffect, useRef } from "react";
import "./about.css";

export default function About() {
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef(null);
  const textareaRef = useRef(null);

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
    typeResponse(response);
  };

  useEffect(() => {
  const handleFocus = () => {
    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
  };
  const textarea = textareaRef.current;
  textarea.addEventListener("focus", handleFocus);

  return () => textarea.removeEventListener("focus", handleFocus);
}, []);

  const typeResponse = (text) => {
    setIsTyping(true);
    let i = 0;
    const speed = 25;
    let typed = "";

    const interval = setInterval(() => {
      if (i < text.length) {
        typed += text[i];
        setOutput((prev) => {
          const newOut = [...prev];
          newOut[newOut.length - 1].response = typed;
          return newOut;
        });
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  useEffect(() => {
  const updateVh = () => {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  };
  window.addEventListener("resize", updateVh);
  updateVh();
  return () => window.removeEventListener("resize", updateVh);
}, []);

  const handleKeyDown = (e) => {
    if (isTyping) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = currentLine.trim();
      setOutput((prev) => [...prev, { command: cmd, response: "" }]);
      handleCommand(cmd);
      setCurrentLine("");
      e.target.value = "";
    }
  };

  const handleChange = (e) => {
    setCurrentLine(e.target.value);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    // Always focus on mobile when user taps anywhere
    const focusHandler = () => textareaRef.current.focus();
    const terminal = document.querySelector(".terminal-real");
    terminal.addEventListener("click", focusHandler);
    return () => terminal.removeEventListener("click", focusHandler);
  }, []);

  return (
    <div className="terminal-real">
      <div className="terminal-header">About Me Terminal (Type "help")</div>

      <div className="terminal-output">
        {output.map((line, i) => (
          <div key={i} className="terminal-line">
            <span className="prompt">$ {line.command}</span>
            {line.response && <div className="response">{line.response}</div>}
          </div>
        ))}

        <div className="terminal-line current">
          <span className="prompt">$ </span>
          <span>{currentLine}</span>
          <span className="cursor">▌</span>
        </div>

        {/* Hidden Textarea for Mobile */}
        <textarea
          ref={textareaRef}
          className="hidden-input"
          value={currentLine}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
